import { Module } from '@nestjs/common';
import { VehicleCommandController } from './controller/vehicle-command.controller';
import { VehicleCommandService } from './service/vehicle-command.service';
import { KafkaProducerModule } from '../kafka-producer/kafka-producer.module';

@Module({
  imports: [KafkaProducerModule],
  controllers: [VehicleCommandController],
  providers: [VehicleCommandService],
})
export class VehicleCommandModule {}
