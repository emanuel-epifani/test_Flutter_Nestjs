import { Injectable } from '@nestjs/common';
import { CreateStudenteDto } from './dto/create-studente.dto';
import { UpdateStudenteDto } from './dto/update-studente.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Studente } from './entities/studente.entity';

@Injectable()
export class StudenteService {
  constructor(
    @InjectRepository(Studente)
    private usersRepository: Repository<Studente>,
  ) {}

  create(createStudenteDto: CreateStudenteDto) {
    return this.usersRepository.create();
  }

  getAll(): Promise<Studente[]> {
    return this.usersRepository.query('SELECT * FROM studente');
  }

  findAll(): Promise<Studente[]> {
    return this.usersRepository.find();
    //return`This action returns all studente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studente`;
  }

  update(id: number, updateStudenteDto: UpdateStudenteDto) {
    return `This action updates a #${id} studente`;
  }

  remove(id: number) {
    return `This action removes a #${id} studente`;
  }
}
