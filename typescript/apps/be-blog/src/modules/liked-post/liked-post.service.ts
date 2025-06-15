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

  async getLikedPost(args: { accountId: string; postId: string }) {
    const where: FindOptionsWhere<LikedPost> = {
      accountId: args.accountId,
      postId: args.postId,
    };

    return this.likedPostRepository.findOne({ where });
  }

  async createLikedPost(args: { accountId: string; postId: string }) {
    const likedPost = this.likedPostRepository.create({
      accountId: args.accountId,
      postId: args.postId,
    });

    return this.likedPostRepository.save(likedPost);
  }

  async deleteLikedPost(args: { accountId: string; postId: string }) {
    const where: FindOptionsWhere<LikedPost> = {
      accountId: args.accountId,
      postId: args.postId,
    };

    return this.likedPostRepository.delete(where);
  }

  async likeOrUnlikePost(args: { accountId: string; postId: string }) {
    const likedPost = await this.getLikedPost(args);

    if (likedPost) {
      await this.deleteLikedPost(args);
      return false;
    }

    await this.createLikedPost(args);
    return true;
  }

  async countLikedPosts(args: { postId?: string }) {
    const where: FindOptionsWhere<LikedPost> = {};

    if (args.postId) {
      where.postId = args.postId;
    }

    return this.likedPostRepository.count({ where });
  }
}
