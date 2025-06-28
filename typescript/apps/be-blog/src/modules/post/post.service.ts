import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { assert } from "@packages/common/utils/assert";
import { Post } from "@packages/entities-blog/post/post.entity";
import { In, Repository, type FindOptionsWhere } from "typeorm";
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
      id?: string;
    },
    options?: IDefaultGetQueryOptions<Post>,
  ) {
    const where: FindOptionsWhere<Post> = {};

    if (args.id) {
      where.id = args.id;
    }

    if (Object.values(where).length === 0) {
      return null;
    }

    return this.postRepository.findOne({
      where,
      ...options,
    });
  }

  async listPosts(
    args: {
      categoryIds?: string[];
      isPublic?: boolean;
    },
    options?: IDefaultListQueryOptions<Post>,
  ) {
    const where: FindOptionsWhere<Post> = {};

    if (args.categoryIds?.length) {
      where.categoryId = In(args.categoryIds);
    }

    if (args.isPublic) {
      where.isPublic = args.isPublic;
    }

    return this.postRepository.find({
      where,
      ...options,
    });
  }

  async updatePost(args: { id?: string }, post: Partial<Post>) {
    const where: FindOptionsWhere<Post> = {};

    if (args.id) {
      where.id = args.id;
    }

    return this.postRepository.update(where, post);
  }

  async upsertPost(args: { id?: string }, post: Partial<Post>) {
    const existingPost = await this.getPost(
      { id: args.id },
      { withDeleted: true },
    );

    if (existingPost) {
      const result = await this.updatePost({ id: args.id }, post);
      assert(result.affected === 1, new UnprocessableEntityException());

      return this.getPost({ id: args.id }, { withDeleted: true });
    }

    return this.postRepository.save(post);
  }
}
