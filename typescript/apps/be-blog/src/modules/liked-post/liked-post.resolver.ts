import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { assert } from "@packages/common/utils/assert";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import type { Request } from "express";
import { getAccountId } from "../../utils/misc.js";
import { SessionAuthGuard } from "../guards/session-auth.guard.js";
import {
  CountLikedPostsArgs,
  CountLikedPostsResult,
  LikeOrUnlikePostArgs,
} from "./liked-post.dto.js";
import { LikedPostService } from "./liked-post.service.js";

@Resolver(() => Comment)
export class LikedPostResolver {
  constructor(private readonly likedPostService: LikedPostService) {}

  @Mutation(() => CountLikedPostsResult)
  @UseGuards(SessionAuthGuard)
  async likeOrUnlikePost(
    @Context("req") req: Request,
    @Args("args") args: LikeOrUnlikePostArgs,
  ) {
    const id = getAccountId(req);
    assert(id, new UnauthorizedException());

    const isLiked = await this.likedPostService.likeOrUnlikePost({
      accountId: id,
      postId: args.postId,
    });

    const likesCount = await this.likedPostService.countLikedPosts({
      postId: args.postId,
    });

    return {
      isLiked,
      likesCount,
    } as const;
  }

  @Query(() => Number)
  async countLikedPosts(@Args("args") args: CountLikedPostsArgs) {
    return this.likedPostService.countLikedPosts({
      postId: args.postId,
    });
  }
}
