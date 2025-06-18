import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { assert } from "@packages/common/utils/assert";
import { Comment } from "@packages/entities-blog/comment/comment.entity";
import { Repository, type FindOptionsWhere } from "typeorm";
import type { IDefaultListQueryOptions } from "../../utils/types.js";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getComment(args: { id?: string }) {
    const where: FindOptionsWhere<Comment> = {};

    if (args.id) {
      where.id = args.id;
    }

    if (Object.keys(where).length === 0) {
      return;
    }

    return this.commentRepository.findOne({ where });
  }

  async getCommentOrThrow(args: { id: string }) {
    const comment = await this.getComment(args);
    assert(comment, new NotFoundException());

    return comment;
  }

  async updateComment(args: { id?: string }, comment: Partial<Comment>) {
    const where: FindOptionsWhere<Comment> = {};

    if (args.id) {
      where.id = args.id;
    }

    return this.commentRepository.update(where, comment);
  }

  async upsertComment(args: { id?: string }, comment: Partial<Comment>) {
    const existingComment = await this.getComment({ id: args.id });

    if (existingComment) {
      const result = await this.updateComment({ id: args.id }, comment);
      assert(result.affected === 1, new UnprocessableEntityException());

      return this.getComment({ id: args.id });
    }

    return this.commentRepository.save({ ...comment, id: args.id });
  }

  async listComments(
    args: { postId?: string },
    options?: IDefaultListQueryOptions<Comment>,
  ) {
    const where: FindOptionsWhere<Comment> = {};

    if (args.postId) {
      where.postId = args.postId;
    }

    // FIXME: change to soft delete in typeorm way
    where.isDeleted = false;

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
