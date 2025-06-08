import { Resolver } from "@nestjs/graphql";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import { CommentService } from "./comment.service.js";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
}
