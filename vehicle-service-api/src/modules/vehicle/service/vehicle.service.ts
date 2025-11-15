import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle, VehicleDocument } from '../schema/vehicle.schema';
import { VehicleResponseDto } from '../dtos/vehicleResponse.dto';
import { CreateVehicleDto } from '../dtos/createVehicle.dto';
import { UpdateVehicleDto } from '../dtos/updateVehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<VehicleDocument>,
  ) {}

  async createVehicle(data: CreateVehicleDto): Promise<VehicleResponseDto> {
    const plateNo: string = data.plateNo;

    if (!plateNo || !plateNo.trim()) {
      throw new BadRequestException('Plate number is required');
    }

    const normalizedPlateNo = plateNo.trim().toUpperCase();
    const vehicle = await this.vehicleModel.findOne({ normalizedPlateNo }).exec();

    if (vehicle) {
      throw new ConflictException('Vehicle already exists!');
    }

    data.plateNo = normalizedPlateNo;
    const res = await this.vehicleModel.create(data);
    return this.toResponseDto(res);
  }

  async getAllVehicles(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.vehicleModel.find().exec();
    return vehicles.map((v) => this.toResponseDto(v));
  }

  async getVehicleById(id: string): Promise<VehicleResponseDto> {
    const vehicle = await this.vehicleModel.findById(id).exec();

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found!');
    }

    return this.toResponseDto(vehicle);
  }

  async getVehicleByPlateNo(plateNo: string): Promise<VehicleResponseDto> {
    if (!plateNo || !plateNo.trim()) {
      throw new BadRequestException('Plate number is required');
    }

    const normalizedPlateNo = plateNo.trim().toUpperCase();
    const vehicle = await this.vehicleModel.findOne({ normalizedPlateNo }).exec();

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found!');
    }

    return this.toResponseDto(vehicle);
  }

  async deleteVehicle(id: string): Promise<VehicleResponseDto | null> {
    const deleted = await this.vehicleModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException('Vehicle not found!');
    }

    return this.toResponseDto(deleted);
  }

  async updateVehicle(
    id: string,
    data: UpdateVehicleDto,
  ): Promise<VehicleResponseDto | null> {
    const updated = await this.vehicleModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Vehicle not found!');
    }

    return this.toResponseDto(updated);
  }

  private toResponseDto(doc: VehicleDocument): VehicleResponseDto {
    const obj = doc.toObject();

    return {
      id: obj._id.toString(),
      plateNo: obj.plateNo,
      vehicleYear: obj.vehicleYear,
      price: obj.price,
      contact: obj.contact,
      make: obj.make,
      model: obj.model,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }
}
