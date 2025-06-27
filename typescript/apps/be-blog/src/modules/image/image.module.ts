import { Module } from "@nestjs/common";
import { ImageController } from "./image.controller.js";
import { ImageService } from "./image.service.js";

@Module({
  imports: [],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
