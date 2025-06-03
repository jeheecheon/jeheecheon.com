import { Args, Query, Resolver } from "@nestjs/graphql";
import { Post } from "@packages/entities-blog/post/post.entity";
import { PaginationInput } from "../../utils/dto.js";
import { handlePaginationParams } from "../../utils/pagination.js";
import { GetPostFilter, ListPostsFilter } from "./post.dto.js";
import { PostService } from "./post.service.js";

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

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
        categoryId: filter?.categoryId,
        isPublic: filter?.isPublic,
      },
      {
        ...handlePaginationParams(pagination),
      },
    );
  }
}
