import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikedPost } from "@packages/entities-blog/liked-post/liked-post.entity";
import { LikedPostResolver } from "./liked-post.resolver.js";
import { LikedPostService } from "./liked-post.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([LikedPost])],
  providers: [LikedPostService, LikedPostResolver],
  exports: [LikedPostService],
})
export class LikedPostModule {}
