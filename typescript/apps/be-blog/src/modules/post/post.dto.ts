import { Field, InputType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

@InputType()
export class GetPostFilter {
  @Field(() => String)
  id: string;
}

@InputType()
export class ListPostsFilter {
  @Field(() => [String], { nullable: true })
  @IsOptional()
  categoryIds?: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isPublic?: boolean;
}

@InputType()
export class UpsertPostArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  content?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  cover?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  isPublic?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  categoryId?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  uploadedAt?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  editedAt?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  deletedAt?: Date;
}
