import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { Utils } from '../../base/utils/utils.class';
import { KafkaModuleConfig } from '../../base/interfaces/kafka-config.interface';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnApplicationShutdown
{
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private isConnected = false;

  constructor() {
    const kafkaConfig: KafkaModuleConfig = Utils.readModuleConfig('kafka-producer');

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
    } catch (error) {
      throw error;
    }
  }

  async produce(record: ProducerRecord): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Kafka producer is not connected');
    }

    try {
      await this.producer.send(record);
    } catch (error) {
        throw error;
    }
  }

  async onApplicationShutdown() {
    try {
      if (this.isConnected) {
        await this.producer.disconnect();
        this.isConnected = false;
      }
    } catch (error) {
      throw error;
    }
  }
}
