import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { configs } from "../../utils/config.js";

@Injectable()
export class ImageService {
  private readonly s3 = new S3Client({
    region: configs.AWS_REGION,
    credentials: {
      accessKeyId: configs.AWS_ACCESS_KEY_ID,
      secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor() {}

  async uploadImage(args: { postId?: string; image: Express.Multer.File }) {
    const imageName = `${Date.now()}-${args.image.originalname}`;
    const pathname = args.postId
      ? `blog/posts/${args.postId}/images/${imageName}`
      : `blog/images/${imageName}`;

    const command = new PutObjectCommand({
      Bucket: configs.AWS_S3_BUCKET,
      Key: pathname,
      Body: args.image.buffer,
      ContentType: args.image.mimetype,
    });

    await this.s3.send(command);

    return {
      url: `https://${configs.AWS_S3_BUCKET}.s3.${configs.AWS_REGION}.amazonaws.com/${pathname}`,
    };
  }
}
