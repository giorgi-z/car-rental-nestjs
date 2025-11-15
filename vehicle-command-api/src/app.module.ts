import { Module } from '@nestjs/common';
import { KafkaProducerModuleModule } from './modules/kafka-producer-module/kafka-producer-module.module';
import { VehicleCommandModuleModule } from './modules/vehicle-command-module/vehicle-command-module.module';

@Module({
  imports: [
    KafkaProducerModuleModule, 
    VehicleCommandModuleModule]
})

export class AppModule {}
