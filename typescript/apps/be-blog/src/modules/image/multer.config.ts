import { Nullable } from "@packages/common/types/misc";
import { Request } from "express";
import { memoryStorage } from "multer";

export const multerOptions = {
  storage: memoryStorage(),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Nullable<Error>, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"), false);
      return;
    }

    cb(null, true);
  },
};
