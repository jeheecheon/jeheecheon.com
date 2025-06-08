import { Args, Query, Resolver } from "@nestjs/graphql";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import { ListCommentsFilter } from "./comment.dto.js";
import { CommentService } from "./comment.service.js";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  async comments(
    @Args("filter", { nullable: true }) filter?: ListCommentsFilter,
  ) {
    return this.commentService.listComments({
      postId: filter?.postId,
    });
  }
}
