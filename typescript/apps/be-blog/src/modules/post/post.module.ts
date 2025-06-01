import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "@packages/entities-blog/post/post.entity";
import { PostResolver } from "./post.resolver.js";
import { PostService } from "./post.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
