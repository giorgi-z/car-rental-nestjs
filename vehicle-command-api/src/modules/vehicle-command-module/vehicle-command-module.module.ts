import { Module } from '@nestjs/common';
import { VehicleCommandController } from './controller/vehicle-command.controller';
import { VehicleCommandService } from './service/vehicle-command.service';

@Module({


  controllers: [VehicleCommandController],


  providers: [VehicleCommandService]
})

export class VehicleCommandModuleModule {}
