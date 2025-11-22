import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ collection: 'auth' })
@ObjectType()
export class Auth {
  @Field(() => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  password: string;
  
  @Prop({ required: true })
  @Field()
  otp: string;

  @Prop({ required: true })
  @Field()
  otp_time: string;

  @Prop({ required: false, default: false })
  @Field()
  isVerified: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
