import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "@packages/entities-blog/post/post.entity";
import { CommentModule } from "../comment/comment.module.js";
import { LikedPostModule } from "../liked-post/liked-post.module.js";
import { PostResolver } from "./post.resolver.js";
import { PostService } from "./post.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CommentModule, LikedPostModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
