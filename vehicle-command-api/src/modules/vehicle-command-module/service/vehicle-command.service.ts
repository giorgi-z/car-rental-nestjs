import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from '../dtos/createVehicle.dto';
import { VehicleResponseDto } from '../dtos/createVehicleResponse.dto';

@Injectable()
export class VehicleCommandService {

    async createRestaurant(data: CreateVehicleDto): Promise<VehicleResponseDto>{
        
    }
}
