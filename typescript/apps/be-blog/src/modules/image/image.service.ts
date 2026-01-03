import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { configs } from "../../utils/config.js";
import { putObject } from "../../utils/s3.js";

@Injectable()
export class ImageService {
  async uploadImage(args: { postId?: string; image: Express.Multer.File }) {
    const imageName = `${Date.now()}-${args.image.originalname}`;
    const key = args.postId
      ? `blog/posts/${args.postId}/images/${imageName}`
      : `blog/images/${imageName}`;

    try {
      await putObject({
        key,
        body: args.image.buffer,
        contentType: args.image.mimetype,
      });

      return {
        url: `https://${configs.AWS_S3_BUCKET}.s3.${configs.AWS_REGION}.amazonaws.com/${key}`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        "Failed to upload image: " + error,
      );
    }
  }
}
