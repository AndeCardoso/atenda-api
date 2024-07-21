import fs from "fs";
import ejs from "ejs";
import path from "path";
import { address } from "@shared/types/address.type";
import { CustomerResponseDTO } from "@modules/customer/dtos/CustomerResponseDTO";
import { EquipmentResponseDTO } from "@modules/equipment/dtos/EquipmentResponseDTO";

const templatePath = path.join(__dirname, "index.ejs");

const customerReportTemplateFile = fs.readFileSync(templatePath, "utf-8");

export const generateCustomerReportTemplateWithData = ({
  customer,
  equipment,
  address,
  serviceOrder,
  technicianName,
}: {
  customer: Partial<CustomerResponseDTO>;
  equipment: Partial<EquipmentResponseDTO>;
  address: address;
  serviceOrder: any;
  technicianName: string;
}) => {
  const renderedTemplate = ejs.render(customerReportTemplateFile, {
    customer,
    equipment,
    address,
    serviceOrder,
    technicianName,
  });

  return renderedTemplate;
};
