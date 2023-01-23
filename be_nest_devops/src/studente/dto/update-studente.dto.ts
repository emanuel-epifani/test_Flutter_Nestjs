import { PartialType } from '@nestjs/mapped-types';
import { CreateStudenteDto } from './create-studente.dto';

export class UpdateStudenteDto extends PartialType(CreateStudenteDto) {}
