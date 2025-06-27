import { Nullable } from "@packages/common/types/misc";
import { Request } from "express";
import multerS3 from "multer-s3";
import { configs } from "../../utils/config.js";
import { s3 } from "./s3.config.js";

export const multerOptions = {
  storage: multerS3({
    s3,
    bucket: configs.AWS_S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (
      req: Request & { body: { postId: string } },
      file: Express.MulterS3.File,
      cb: (error: Nullable<Error>, key: string) => void,
    ) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      const postId = req.body.postId;

      if (!postId) {
        cb(new Error("Post ID is required"), "");
        return;
      }

      const folderPath = `blog/posts/${postId}/images`;

      cb(null, `${folderPath}/${fileName}`);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.MulterS3.File,
    cb: (error: Nullable<Error>, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"), false);
      return;
    }

    cb(null, true);
  },
};
