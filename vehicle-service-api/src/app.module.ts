import { Module } from '@nestjs/common';
import { KafkaConsumerModule } from './modules/kafka-consumer/kafka-consumer.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    DatabaseModule, 
    VehicleModule, 
    KafkaConsumerModule],
})
export class AppModule {}
