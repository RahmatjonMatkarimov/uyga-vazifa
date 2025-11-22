import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class VerifyInput {
  @Field()
  otp: string;

  @Field()
  otp_time: string;
  email: unknown;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  password: string;
  email: unknown;
}
