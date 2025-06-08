import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import { Repository, type FindOptionsWhere } from "typeorm";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async countComments(args: { postId?: string }) {
    const where: FindOptionsWhere<Comment> = {};

    if (args.postId) {
      where.postId = args.postId;
    }

    return this.commentRepository.count({ where });
  }
}
