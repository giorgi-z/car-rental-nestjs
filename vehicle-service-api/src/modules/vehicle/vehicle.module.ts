import { Module } from '@nestjs/common';
import { VehicleService } from './service/vehicle.service';
import { VehicleController } from './controller/vehicle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './schema/vehicle.schema';

@Module({
  imports: [
    // THIS is what creates the VehicleModel provider
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
    ]),
  ],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService]
})
export class VehicleModule {}
