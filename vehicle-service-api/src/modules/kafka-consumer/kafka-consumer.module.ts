import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './service/kafka-consumer.service';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
  imports: [VehicleModule], 
  providers: [KafkaConsumerService],
  exports: [KafkaConsumerService],
})

export class KafkaConsumerModule {}
