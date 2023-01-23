import { Module } from '@nestjs/common';
import { StudenteService } from './studente.service';
import { StudenteController } from './studente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studente } from './entities/studente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Studente])],
  controllers: [StudenteController],
  providers: [StudenteService],
})
export class StudenteModule {}
