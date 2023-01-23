import { Test, TestingModule } from '@nestjs/testing';
import { StudenteService } from './studente.service';

describe('StudenteService', () => {
  let service: StudenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudenteService],
    }).compile();

    service = module.get<StudenteService>(StudenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
