import { Field, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class GetPostFilter {
  @Field(() => String)
  id: string;
}

@InputType()
export class ListPostsFilter {
  @Field(() => String, { nullable: true })
  @IsOptional()
  categoryId?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isPublic?: boolean;
}
