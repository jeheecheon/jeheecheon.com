import { Field, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class ListCommentsFilter {
  @Field(() => String, { nullable: true })
  @IsOptional()
  postId?: string;
}
