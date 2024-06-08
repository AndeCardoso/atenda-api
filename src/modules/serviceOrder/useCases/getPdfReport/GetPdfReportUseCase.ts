import { prisma } from "@prismaClient/client";
import { contentNotFound, ok, serverError } from "@helper/http/httpHelper";
import { HttpResponse } from "@shared/protocols/http";
import { bucketName, client, namespace } from "@services/Bucket";
import { generateCustomerReportTemplateWithData } from "@services/PDF/templates/customerReport";
import puppeteer from "puppeteer";
import { Buffer } from "buffer";
import { bucketConfig } from "@config/bucket";

export class GetPdfReportUseCase {
  async execute(
    serviceOrderId: number,
    companyId: number
  ): Promise<HttpResponse<Buffer>> {
    try {
      const serviceOrder = await prisma.serviceOrder.findUnique({
        where: { companyId, id: serviceOrderId },
        select: {
          id: true,
          selectedVoltage: true,
          reportedDefect: true,
          foundDefect: true,
          orderedServices: true,
          executedServices: true,
          observations: true,
          signatureUrl: true,
          opened_at: true,
          closed_at: true,
          totalValue: true,
          status: true,
          address: {
            select: {
              id: true,
              nickname: true,
              cep: true,
              complement: true,
              district: true,
              street: true,
              number: true,
              state: true,
              city: true,
            },
          },
          customer: {
            select: {
              id: true,
              name: true,
              document: true,
              phone: true,
              secondPhone: true,
              email: true,
              status: true,
              updated_at: true,
            },
          },
          equipment: {
            select: {
              id: true,
              nickname: true,
              brand: true,
              model: true,
              description: true,
              serialNumber: true,
              voltage: true,
              accessories: true,
              color: true,
              status: true,
              updated_at: true,
            },
          },
          technician: {
            select: {
              id: true,
              name: true,
            },
          },
          updated_at: true,
          created_at: true,
        },
      });

      if (!serviceOrder) {
        return contentNotFound("Ordem de serviço");
      }

      const renderedPdf = generateCustomerReportTemplateWithData({
        address: serviceOrder.address,
        customer: serviceOrder.customer,
        equipment: serviceOrder.equipment,
        serviceOrder: serviceOrder,
        technicianName: serviceOrder.technician.name,
      });

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(renderedPdf, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({ format: "A4" });

      await browser.close();

      const fileName = `reports/relatorio-os-${serviceOrder.id}.pdf`;

      const objectDetails = {
        namespaceName: namespace,
        bucketName: bucketName,
        putObjectBody: pdfBuffer,
        objectName: fileName,
        contentLength: pdfBuffer.length,
        contentType: "application/pdf",
      };

      await client.putObject(objectDetails);

      const urlPath = `https://objectstorage.${
        bucketConfig.region
      }.oraclecloud.com/n/${namespace}/b/${bucketName}/o/${encodeURIComponent(
        fileName
      )}`;

      return ok({ url: urlPath });
    } catch (error) {
      return serverError(error);
    }
  }
}
