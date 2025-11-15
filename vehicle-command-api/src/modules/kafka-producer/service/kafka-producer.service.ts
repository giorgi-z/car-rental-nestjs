import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { Utils } from '../../base/utils/utils.class';

@Injectable()
export class KafkaProducerService
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger = new Logger(KafkaProducerService.name);
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private isConnected = false;

  constructor() {
    const kafkaConfig = Utils.readModuleConfig('kafka-producer');

    this.kafka = new Kafka({
      clientId: kafkaConfig.kafka.clientId,
      brokers: kafkaConfig.kafka.brokers,
      connectionTimeout: kafkaConfig.kafka.connectionTimeout,
      requestTimeout: kafkaConfig.kafka.requestTimeout,
      retry: {
        initialRetryTime: kafkaConfig.kafka.retry.initialRetryTime,
        retries: kafkaConfig.kafka.retry.retries,
      },
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      this.isConnected = true;
      this.logger.log('✓ Kafka producer connected successfully');
    } catch (error) {
      this.logger.error('✗ Failed to connect Kafka producer', error);
      throw error;
    }
  }

  async produce(record: ProducerRecord): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka producer is not connected');
    }

    try {
      await this.producer.send(record);
      this.logger.log(`✓ Message sent to topic: ${record.topic}`);
    } catch (error) {
      this.logger.error(
        `✗ Failed to send message to topic: ${record.topic}`,
        error,
      );
      throw error;
    }
  }

  async onApplicationShutdown() {
    try {
      if (this.isConnected) {
        await this.producer.disconnect();
        this.isConnected = false;
        this.logger.log('✓ Kafka producer disconnected successfully');
      }
    } catch (error) {
      this.logger.error('✗ Failed to disconnect Kafka producer', error);
      throw error;
    }
  }
}
