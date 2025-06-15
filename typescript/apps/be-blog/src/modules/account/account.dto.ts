import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional } from "class-validator";

@InputType()
export class GetAccountFilter {
  @Field(() => String, { nullable: true })
  @IsOptional()
  id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
