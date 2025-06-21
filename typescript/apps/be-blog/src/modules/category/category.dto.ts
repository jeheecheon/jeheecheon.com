import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ListCategoriesFilter {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  parentCategoryId?: string;

  @Field(() => Boolean, { nullable: true })
  isBottomLevel?: boolean;
}
