import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@packages/entities-blog/post/post.entity";
import { Repository } from "typeorm";
import type { IDefaultGetQueryOptions } from "../../utils/types.js";

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
}
