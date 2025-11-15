import { Test, TestingModule } from '@nestjs/testing';
import { VehicleCommandService } from './vehicle-command.service';

describe('VehicleCommandService', () => {
  let service: VehicleCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleCommandService],
    }).compile();

    service = module.get<VehicleCommandService>(VehicleCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
