import { Body, Controller, Post } from '@nestjs/common';
import { VehicleCommandService } from '../service/vehicle-command.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateVehicleDto } from '../dtos/createVehicle.dto';
import { VehicleResponseDto } from '../dtos/createVehicleResponse.dto';

@Controller('vehicle-command')
export class VehicleCommandController {
    constructor(private restaurantService: VehicleCommandService) {}

    @Post('createVehicle')
    @ApiOperation({summary: 'Create new vehicle'})
    @ApiResponse({status: 201, description: 'Create vehicle in Db'})
    @ApiBody({type: CreateVehicleDto})
    async createVehicle(@Body() body: CreateVehicleDto): Promise<VehicleResponseDto> {
        return await this.restaurantService.createRestaurant(body);
    }
}
