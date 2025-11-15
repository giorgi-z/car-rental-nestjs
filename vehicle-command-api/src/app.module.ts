import { Module } from '@nestjs/common';
import { KafkaProducerModule } from './modules/kafka-producer/kafka-producer.module';
import { VehicleCommandModule } from './modules/vehicle/vehicle-command-module.module';

@Module({
  imports: [KafkaProducerModule, VehicleCommandModule],
})
export class AppModule {
  public static rootDir: string = __dirname;
  public static configsDir = `${__dirname}/configs`;
}
