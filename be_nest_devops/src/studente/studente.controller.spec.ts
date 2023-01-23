import { Test, TestingModule } from '@nestjs/testing';
import { StudenteController } from './studente.controller';
import { StudenteService } from './studente.service';

describe('StudenteController', () => {
  let controller: StudenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudenteController],
      providers: [StudenteService],
    }).compile();

    controller = module.get<StudenteController>(StudenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
