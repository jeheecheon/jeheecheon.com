import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LikedPost } from "@packages/entities-blog/liked-post/liked-post.entity";
import { Repository, type FindOptionsWhere } from "typeorm";

@Injectable()
export class LikedPostService {
  constructor(
    @InjectRepository(LikedPost)
    private readonly likedPostRepository: Repository<LikedPost>,
  ) {}

  async countLikedPosts(args: { postId?: string }) {
    const where: FindOptionsWhere<LikedPost> = {};

    if (args.postId) {
      where.postId = args.postId;
    }

    return this.likedPostRepository.count({ where });
  }
}
