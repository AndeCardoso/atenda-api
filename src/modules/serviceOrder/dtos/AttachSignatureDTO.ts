import { ICompanyRequest } from "@shared/types/pagination.type";

export interface AttachSignatureDTO extends ICompanyRequest {
  signatureImage: IUploadedFile;
  serviceOrderId: number;
}

export interface IUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
