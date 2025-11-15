import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { VehicleService } from '../service/vehicle.service';
import { CreateVehicleDto } from '../dtos/createVehicle.dto';
import { VehicleResponseDto } from '../dtos/vehicleResponse.dto';
import { UpdateVehicleDto } from '../dtos/updateVehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post('createVehicle')
  @ApiOperation({ summary: 'Create new vehicle' })
  @ApiResponse({ status: 201, description: 'Create vehicle in Db' })
  @ApiBody({ type: CreateVehicleDto })
  async createVehicle(
    @Body() body: CreateVehicleDto,
  ): Promise<VehicleResponseDto> {
    return await this.vehicleService.createVehicle(body);
  }

  @Get('getAllVehicles')
  @ApiOperation({ summary: 'Get list of all vehicles' })
  @ApiResponse({ status: 200, description: 'Get list of all vehicles from Db' })
  async getAllVehicles(): Promise<VehicleResponseDto[]> {
    return await this.vehicleService.getAllVehicles();
  }

  @Get('getVehicleById/:id')
  @ApiOperation({ summary: 'Get vehicle by Id' })
  @ApiResponse({ status: 200, description: 'Get vehicle by Id from Db' })
  @ApiParam({ name: 'id', type: String, description: 'The id of the vehicle' })
  async getVehicleById(@Param('id') id: string): Promise<VehicleResponseDto> {
    return await this.vehicleService.getVehicleById(id);
  }

  @Get('getVehicleByPlateNo/:plateNo')
  @ApiOperation({ summary: 'Get vehicle by plate number' })
  @ApiResponse({
    status: 200,
    description: 'Get vehicle by plate number from Db',
  })
  @ApiParam({
    name: 'plateNo',
    type: String,
    description: 'The plate number of the vehicle',
  })
  async getVehicleByPlateNo(
    @Param('plateNo') plateNo: string,
  ): Promise<VehicleResponseDto> {
    return await this.vehicleService.getVehicleByPlateNo(plateNo);
  }

  @Delete('deleteVehicle')
  @ApiOperation({ summary: 'Delete vehicle by Id' })
  @ApiResponse({ status: 200, description: 'Delete vehicle in Db' })
  @ApiQuery({ name: 'id', required: true })
  async deleteVehicle(@Query('id') id: string) {
    return await this.vehicleService.deleteVehicle(id);
  }

  @Put('updateVehicle/:id')
  @ApiOperation({ summary: 'Update vehicle' })
  @ApiResponse({ status: 200, description: 'Update vehicle in Db' })
  @ApiParam({ name: 'id', type: String, description: 'The id of the vehicle' })
  @ApiBody({ type: UpdateVehicleDto })
  async updateVehicle(@Param('id') id: string, @Body() body: UpdateVehicleDto) {
    return await this.vehicleService.updateVehicle(id, body);
  }
}
