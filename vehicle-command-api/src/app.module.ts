import { Module } from '@nestjs/common';
import { KafkaProducerModuleModule } from './modules/kafka-producer/kafka-producer.module';
import { VehicleCommandModuleModule } from './modules/vehicle/vehicle-command-module.module';

@Module({
  imports: [
    KafkaProducerModuleModule, 
    VehicleCommandModuleModule]
})

export class AppModule {
  public static rootDir: string = __dirname;
  public static configsDir = `${__dirname}/configs`;
}
