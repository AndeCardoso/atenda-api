import { Request } from "express";
import { Middleware } from "express-validator/src/base";
import multer, { FileFilterCallback } from "multer";
import path from "path";
let uploadMiddleware;
try {
  const uploadDir = path.resolve(
    __dirname,
    "../..",
    "public/uploads/signatures"
  );
  const storage = multer.diskStorage({
    destination: (__, _, cb) => {
      cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
      cb(null, "atenda_" + file.originalname);
    },
  });

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

  const upload = multer({
    dest: uploadDir,
    storage: storage,
    fileFilter: fileFilter as any,
  });

  uploadMiddleware = upload.single("image");
} catch (error) {
  console.log("upload-error", JSON.stringify(error, null, 2));
}

export default uploadMiddleware as Middleware;
