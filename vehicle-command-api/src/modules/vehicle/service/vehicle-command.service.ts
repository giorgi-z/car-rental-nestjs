import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateVehicleDto } from '../dtos/createVehicle.dto';
import { VehicleResponseDto } from '../dtos/createVehicleResponse.dto';
import { KafkaProducerService } from '../../kafka-producer/service/kafka-producer.service';
import { KAFKA_ACTIONS } from '../../base/constants/kafka-actions.constant';
import { Utils } from 'src/modules/base/utils/utils.class';

@Injectable()
export class VehicleCommandService {
  private readonly kafkaConfig:any;

  constructor(private readonly kafkaProducerService: KafkaProducerService) {
    this.kafkaConfig = Utils.readModuleConfig('kafka-producer');
  }

  async createVehicle(data: CreateVehicleDto): Promise<VehicleResponseDto> {
    const plateNo: string = data.plateNo;

    if (!plateNo || !plateNo.trim()) {
      throw new BadRequestException('Plate number is required');
    }

    const normalizedPlateNo = plateNo.trim().toUpperCase();
    data.plateNo = normalizedPlateNo;

    const response = this.toResponseDto(data);

    try {
      await this.kafkaProducerService.produce({
        topic: this.kafkaConfig.kafka.topics.vehicleEvents,
        messages: [
          {
            key: response.plateNo,
            value: JSON.stringify({
              plateNo: response.plateNo,
              make: response.make,
              model: response.model,
              vehicleYear: response.vehicleYear,
              price: response.price,
              contact: response.contact,
              timestamp: new Date().toISOString(),
            }),
            headers: {
              'action': KAFKA_ACTIONS.VEHICLE_CREATED,
              'date': Date.now().toString()
            },
          },
        ],
      });
    } catch (error) {
    }

    return response;
  }

  private toResponseDto(data: CreateVehicleDto): VehicleResponseDto {
    return {
      plateNo: data.plateNo,
      vehicleYear: data.vehicleYear,
      price: data.price,
      contact: data.contact,
      make: data.make,
      model: data.model,
    };
  }
}
