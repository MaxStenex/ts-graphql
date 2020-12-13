import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql/dist/decorators";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field() password: string;
}
