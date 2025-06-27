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
import { ImageService } from "./image.service.js";
import { multerOptions } from "./multer.config.js";

@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("upload")
  @UseGuards(AdminSessionAuthGuard)
  @UseInterceptors(FileInterceptor("image", multerOptions))
  async uploadImage(
    @Body() body: { postId?: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imageService.uploadImage({
      postId: body.postId,
      image: file,
    });
  }
}
