import { User } from "../../entity/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { LoginInput } from "./LoginInput";
import bcrypt from "bcryptjs";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(@Arg("data") { email, password }: LoginInput): Promise<User | null> {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return null;
    }

    return user;
  }
}
