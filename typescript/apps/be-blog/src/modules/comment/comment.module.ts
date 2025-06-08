import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import { CommentResolver } from "./comment.resolver.js";
import { CommentService } from "./comment.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
