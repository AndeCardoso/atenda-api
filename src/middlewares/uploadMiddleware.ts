import { bucketConfig } from "@config/bucket";
import { bucketName, client, namespace } from "@services/Bucket";
import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.memoryStorage();

export const upload = multer({ storage, fileFilter, dest: "/uploads/" });

export const uploadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileBuffer = req.file.buffer;
    const fileName = `uploads/${req.file.originalname}`;

    const objectDetails = {
      namespaceName: namespace,
      bucketName: bucketName,
      putObjectBody: fileBuffer,
      objectName: fileName,
      contentLength: fileBuffer.length,
      contentType: "image/jpeg",
    };

    await client.putObject(objectDetails);

    const urlPath = `https://objectstorage.${
      bucketConfig.region
    }.oraclecloud.com/n/${namespace}/b/${bucketName}/o/${encodeURIComponent(
      fileName
    )}`;

    req.file.path = urlPath;

    next();
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send("Erro ao armazenar a imagem");
  }
};
