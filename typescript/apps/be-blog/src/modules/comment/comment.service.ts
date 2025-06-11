import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import { Repository, type FindOptionsWhere } from "typeorm";
import type { IDefaultListQueryOptions } from "../../utils/types.js";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async listComments(
    args: { postId?: string },
    options?: IDefaultListQueryOptions<Comment>,
  ) {
    const where: FindOptionsWhere<Comment> = {};

    if (args.postId) {
      where.postId = args.postId;
    }

    return this.commentRepository.find({ where, ...options });
  }

  async countComments(args: { postId?: string }) {
    const where: FindOptionsWhere<Comment> = {};

    if (args.postId) {
      where.postId = args.postId;
    }

    return this.commentRepository.count({ where });
  }
}
