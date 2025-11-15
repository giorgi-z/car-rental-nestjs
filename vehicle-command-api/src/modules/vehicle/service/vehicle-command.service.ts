import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from '../dtos/createVehicle.dto';
import { VehicleResponseDto } from '../dtos/createVehicleResponse.dto';

@Injectable()
export class VehicleCommandService {

    async createVehicle(data: CreateVehicleDto): Promise<CreateVehicleDto> {
        const plateNo: string = data.plateNo;

        if (!plateNo || !plateNo.trim()) {
            throw new BadRequestException('Plate number is required');
        }

        const normalizedPlateNo = plateNo.trim().toUpperCase();
        data.plateNo = normalizedPlateNo;

        return this.toResponseDto(data);
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
