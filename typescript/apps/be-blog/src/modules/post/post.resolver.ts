import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Post } from "@packages/entities-blog/post/post.entity";
import { PaginationInput } from "../../utils/dto.js";
import { handlePaginationParams } from "../../utils/pagination.js";
import { CommentService } from "../comment/comment.service.js";
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
    });
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
