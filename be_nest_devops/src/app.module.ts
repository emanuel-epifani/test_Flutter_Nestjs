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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.215',
      port: 5436,
      username: 'emanuelepifani',
      password: 'gigetto',
      database: 'emanuelepifani',
      //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [Studente],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Studente]),
    StudenteModule,
  ],
  controllers: [StudenteController, AppController],
  providers: [StudenteService, AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5433,
//   username: 'emanuelepifani',
//   password: 'gigetto',
//   database: 'emanuelepifani',
//   //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   entities: [Studente],
//   synchronize: false,
// })
