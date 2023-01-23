import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudenteService } from './studente.service';
import { CreateStudenteDto } from './dto/create-studente.dto';
import { UpdateStudenteDto } from './dto/update-studente.dto';

@Controller('studente')
export class StudenteController {
  constructor(private readonly studenteService: StudenteService) {}

  @Post()
  create(@Body() createStudenteDto: CreateStudenteDto) {
    return this.studenteService.create(createStudenteDto);
  }

  @Get('readStudent')
  findAll() {
    return this.studenteService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studenteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudenteDto: UpdateStudenteDto,
  ) {
    return this.studenteService.update(+id, updateStudenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studenteService.remove(+id);
  }
}
