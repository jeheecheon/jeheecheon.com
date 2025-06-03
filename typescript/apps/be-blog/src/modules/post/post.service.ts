import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@packages/entities-blog/post/post.entity";
import { Repository, type FindOptionsWhere } from "typeorm";
import type {
  IDefaultGetQueryOptions,
  IDefaultListQueryOptions,
} from "../../utils/types.js";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async getPost(
    args: {
      id: string;
    },
    options?: IDefaultGetQueryOptions<Post>,
  ) {
    return this.postRepository.findOne({
      where: {
        id: args.id,
      },
      ...options,
    });
  }

  async listPosts(
    args: {
      categoryId?: string;
      isPublic?: boolean;
    },
    options?: IDefaultListQueryOptions<Post>,
  ) {
    const where: FindOptionsWhere<Post> = {};

    if (args.categoryId) {
      where.categoryId = args.categoryId;
    }

    if (args.isPublic) {
      where.isPublic = args.isPublic;
    }

    return this.postRepository.find({
      where,
      ...options,
    });
  }
}
