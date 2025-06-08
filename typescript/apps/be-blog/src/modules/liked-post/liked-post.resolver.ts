import { Resolver } from "@nestjs/graphql";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import { LikedPostService } from "./liked-post.service.js";

@Resolver(() => Comment)
export class LikedPostResolver {
  constructor(private readonly likedPostService: LikedPostService) {}
}
