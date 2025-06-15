import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class LikeOrUnlikePostArgs {
  @Field(() => String)
  postId: string;
}

@InputType()
export class CountLikedPostsArgs {
  @Field(() => String, { nullable: true })
  postId?: string;
}

@ObjectType()
export class CountLikedPostsResult {
  @Field(() => Number)
  likesCount: number;

  @Field(() => Boolean)
  isLiked: boolean;
}
