import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudenteModule } from './studente/studente.module';
//import { Studente } from './studente/entities/studente.entity';
import { StudenteService } from './studente/studente.service';
import { StudenteController } from './studente/studente.controller';
import { Studente } from './studente/entities/studente.entity';
import { DataSource } from 'typeorm';
import {MongooseModule} from "@nestjs/mongoose";
import {JwtModule} from "@nestjs/jwt";
import {UserSchema} from "./auth/user/user.entity";

@Module({
  imports: [
    //----------------   connection POSTGRES  -----------------
    //
    TypeOrmModule.forRoot({
      type: 'postgres',
      //host: '192.168.1.215',
      host: 'localhost',
      port: 5433,
      username: 'emanuelepifani',
      password: 'gigetto',
      database: 'emanuelepifani',
      //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [Studente],
      synchronize: false, //se a true, ogni volte che re-run ti resetta il db?
    }),
    TypeOrmModule.forFeature([Studente]),
    StudenteModule,
    //----------------   connection MONGODB -----------------
    // ($ npm i @nestjs/mongoose mongoose)
    MongooseModule.forRoot(
        'mongodb+srv://srv-staging-etable:tMzY8eD7YiHSdAKD@etable-cl.ftxyywv.mongodb.net/etable-staging?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema }
    ]),
    JwtModule.register({
      secret: "frontendAngular",//stringa segreta utilizzata per firmare i token JWT,unica per ogni applicazione
      signOptions: { expiresIn: '60s' },
      secretOrPrivateKey: "frontendAngular",
    }),
  ],
  controllers: [StudenteController, AppController],
  providers: [StudenteService, AppService],
})
export class AppModule {}


