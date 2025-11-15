import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class ContactDto {
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @ApiProperty({example: '555222333'})
  phone: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a string' })
  @ApiProperty({example: 'test@mail.com'})
  email: string;
} 

export class UpdateVehicleDto{
    @IsOptional()
    @IsString({ message: 'Plate number must be a string' })
    @ApiProperty({example: 'TE001ST'})
    plateNo: string;

    @IsOptional()
    @IsString({ message: 'Make must be a string' })
    @ApiProperty({example: 'BYD'})
    make: string;

    @IsOptional()
    @IsString({ message: 'Model must be a string' })
    @ApiProperty({example: 'Qin Plus'})
    model: string;

    @IsOptional()
    @IsInt({ message: 'Vehicle year must be a number' })
    @ApiProperty({example: 2015})
    vehicleYear: number;

    @IsOptional()
    @IsNumber({}, { message: 'Price must be a number' })
    @ApiProperty({example: 100})
    price: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => ContactDto)
    @ApiProperty({type: () => ContactDto})
    contact: ContactDto;
}