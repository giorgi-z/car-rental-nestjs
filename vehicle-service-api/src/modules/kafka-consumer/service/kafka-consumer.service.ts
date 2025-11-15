import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { VehicleService } from '../../vehicle/service/vehicle.service';
import { CreateVehicleDto } from '../../vehicle/dtos/createVehicle.dto';
import { Utils } from '../../base/utils/utils.class';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;
  private readonly topic: string;
  private readonly kafkaConfig: any;

  constructor(private readonly vehicleService: VehicleService) {
    // Get Kafka configuration from config file
    const config = Utils.readModuleConfig('kafka');
    this.kafkaConfig = config.kafka;

    const { clientId, brokers, groupId, topics, consumer, retry } =
      this.kafkaConfig;
    this.topic = topics.vehicleEvents;

    // Initialize Kafka client
    this.kafka = new Kafka({
      clientId,
      brokers,
      retry: {
        retries: retry.retries,
        initialRetryTime: retry.initialRetryTime,
        maxRetryTime: retry.maxRetryTime,
      },
    });

    // Create consumer instance
    this.consumer = this.kafka.consumer({
      groupId,
      sessionTimeout: consumer.sessionTimeout,
      heartbeatInterval: consumer.heartbeatInterval,
      allowAutoTopicCreation: consumer.allowAutoTopicCreation,
    });
  }

  async onModuleInit() {
    await this.connectConsumer();
  }

  private async connectConsumer() {
    try {
      await this.consumer.connect();

      // Subscribe to the topic
      await this.consumer.subscribe({
        topic: this.topic,
        fromBeginning: false,
      });

      // Start consuming messages
      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          await this.handleMessage(payload);
        },
      });
    } catch (error) {
      // Retry connection after configured timeout
      setTimeout(
        () => this.connectConsumer(),
        this.kafkaConfig.retry.reconnectTimeout,
      );
    }
  }

  private async handleMessage(payload: EachMessagePayload) {
    const { topic, partition, message } = payload;

    try {
      const value = message.value?.toString();

      if (!value) {
        return;
      }

      // Parse the message
      const vehicleData = JSON.parse(value);

      if(
         vehicleData &&
         vehicleData.plateNo &&
         vehicleData.vehicleYear &&
         vehicleData.price != null &&
         vehicleData.contact
      ){
        // Create DTO instance
        const createVehicleDto: CreateVehicleDto = {
          plateNo: vehicleData.plateNo,
          make: vehicleData.make,
          model: vehicleData.model,
          vehicleYear: vehicleData.vehicleYear,
          price: vehicleData.price,
          contact: {
            phone: vehicleData.contact.phone,
            email: vehicleData.contact.email,
          },
        };

        // Create vehicle using VehicleService
        const createdVehicle = await this.vehicleService.createVehicle(createVehicleDto);
      }
    } catch (error) {
      // Optionally, you can implement dead letter queue or retry logic here
    }
  }

  async onModuleDestroy() {
    try {
      await this.consumer.disconnect();
    } catch (error) {}
  }
}
