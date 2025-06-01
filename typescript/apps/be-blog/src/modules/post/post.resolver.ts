import { Args, Query, Resolver } from "@nestjs/graphql";
import { Post } from "@packages/entities-blog/post/post.entity";
import { GetPostFilter } from "./post.dto.js";
import { PostService } from "./post.service.js";

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => Post)
  async post(@Args("filter") filter: GetPostFilter) {
    return this.postService.getPost(filter);
  }
}
