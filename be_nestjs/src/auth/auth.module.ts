// noinspection SpellCheckingInspection

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { User, UserSchema } from "./user/user.entity";

@Module({
  imports: [
    PassportModule,
    JwtModule,
    JwtModule.register({
      secret: "frontendAngular",//stringa segreta utilizzata per firmare i token JWT,unica per ogni applicazione
      signOptions: { expiresIn: '60s' },
      secretOrPrivateKey: "frontendAngular",
    }),
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema }
    ]),
  ],
  controllers: [AuthController, ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
})
export class AuthModule {}
