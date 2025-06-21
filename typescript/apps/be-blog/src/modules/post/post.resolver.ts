import { UseGuards } from "@nestjs/common";
import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { Post } from "@packages/entities-blog/post/post.entity";
import type { Request } from "express";
import { PaginationInput } from "../../utils/dto.js";
import { getAccountId } from "../../utils/misc.js";
import { handlePaginationParams } from "../../utils/pagination.js";
import { CommentService } from "../comment/comment.service.js";
import { SessionAuthGuard } from "../guards/session-auth.guard.js";
import { LikedPostService } from "../liked-post/liked-post.service.js";
import { GetPostFilter, ListPostsFilter } from "./post.dto.js";
import { PostService } from "./post.service.js";

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly likedPostService: LikedPostService,
  ) {}

  @ResolveField(() => Number)
  async likesCount(@Parent() post: Post) {
    return this.likedPostService.countLikedPosts({
      postId: post.id,
    });
  }

  @ResolveField(() => Number)
  async commentsCount(@Parent() post: Post) {
    return this.commentService.countComments({
      postId: post.id,
      isDeleted: false,
    });
  }

  @ResolveField(() => Boolean)
  @UseGuards(SessionAuthGuard)
  async isLiked(@Context("req") req: Request, @Parent() post: Post) {
    const id = getAccountId(req);

    if (!id) {
      return false;
    }

    const likedPost = await this.likedPostService.getLikedPost({
      accountId: id,
      postId: post.id,
    });

    return !!likedPost;
  }

  @Query(() => Post)
  async post(@Args("filter") filter: GetPostFilter) {
    return this.postService.getPost(filter);
  }

  @Query(() => [Post])
  async posts(
    @Args("filter", { nullable: true }) filter?: ListPostsFilter,
    @Args("pagination", { nullable: true }) pagination?: PaginationInput,
  ) {
    return this.postService.listPosts(
      {
        categoryIds: filter?.categoryIds,
        isPublic: filter?.isPublic,
      },
      {
        ...handlePaginationParams(pagination),
        order: {
          uploadedAt: "DESC",
        },
      },
    );
  }
}
