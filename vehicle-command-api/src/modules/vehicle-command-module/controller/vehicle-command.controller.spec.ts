import { Test, TestingModule } from '@nestjs/testing';
import { VehicleCommandController } from './vehicle-command.controller';

describe('VehicleCommandController', () => {
  let controller: VehicleCommandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleCommandController],
    }).compile();

    controller = module.get<VehicleCommandController>(VehicleCommandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
