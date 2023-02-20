import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class User {

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: false })
  password: string;

  @Prop()
  refreshToken: string;

}

export const UserSchema = SchemaFactory.createForClass(User);