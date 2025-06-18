import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import type { Request } from "express";
import { getAccountId } from "../../utils/misc.js";
import { SessionAuthGuard } from "../guards/session-auth.guard.js";
import { ListCommentsFilter, UpsertCommentArgs } from "./comment.dto.js";
import { CommentService } from "./comment.service.js";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  async comments(
    @Args("filter", { nullable: true }) filter?: ListCommentsFilter,
  ) {
    return this.commentService.listComments(
      {
        postId: filter?.postId,
      },
      {
        relations: {
          account: true,
        },
      },
    );
  }

  @Mutation(() => Comment)
  @UseGuards(SessionAuthGuard)
  async upsertComment(
    @Context("req") req: Request,
    @Args("args") args: UpsertCommentArgs,
  ) {
    const id = getAccountId(req);

    return this.commentService.upsertComment(
      { id: args.id },
      {
        accountId: id,
        postId: args.postId,
        content: args.content,
        isDeleted: args.isDeleted,
      },
    );
  }
}
