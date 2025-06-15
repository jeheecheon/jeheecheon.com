import { Field, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class ListCommentsFilter {
  @Field(() => String, { nullable: true })
  @IsOptional()
  postId?: string;
}

@InputType()
export class UpsertCommentArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  postId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  content?: string;
}
