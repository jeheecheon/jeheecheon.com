import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetPostFilter {
  @Field(() => String)
  id: string;
}
