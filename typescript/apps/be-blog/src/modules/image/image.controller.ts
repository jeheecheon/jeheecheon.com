import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminSessionAuthGuard } from "../guards/admin-session-auth.guard.js";
import { multerOptions } from "../s3/multer-s3.config.js";
import { ImageService } from "./image.service.js";

@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("upload")
  @UseGuards(AdminSessionAuthGuard)
  @UseInterceptors(FileInterceptor("image", multerOptions))
  async uploadImage(
    @Body() body: { postId: string },
    @UploadedFile() file: Express.MulterS3.File,
  ) {
    return {
      url: file.location,
    };
  }
}
