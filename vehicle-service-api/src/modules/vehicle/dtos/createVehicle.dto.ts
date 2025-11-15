import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class ContactDto {
  @IsString({ message: 'Phone must be a string' })
  @IsNotEmpty({ message: 'Phone is required' })
  @ApiProperty({example: '555222333'})
  phone: string;

  @IsEmail({}, { message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({example: 'test@mail.com'})
  email: string;
}

export class CreateVehicleDto{
    @IsString({ message: 'Plate number must be a string' })
    @IsNotEmpty({ message: 'Plate number is required' })
    @ApiProperty({example: 'TE001ST'})
    plateNo: string;

    @IsString({ message: 'Make must be a string' })
    @IsNotEmpty({ message: 'Make is required' })
    @ApiProperty({example: 'BYD'})
    make: string;

    @IsString({ message: 'Model must be a string' })
    @IsNotEmpty({ message: 'Model is required' })
    @ApiProperty({example: 'Qin Plus'})
    model: string;

    @IsInt({ message: 'Vehicle year must be a number' })
    @IsNotEmpty({ message: 'Vehicle year is required' })
    @ApiProperty({example: 2015})
    vehicleYear: number;

    @IsNumber({}, { message: 'Price must be a number' })
    @IsNotEmpty({ message: 'Price is required' })
    @ApiProperty({example: 100})
    price: number;

    @ValidateNested()
    @Type(() => ContactDto)
    @ApiProperty({type: () => ContactDto})
    contact: ContactDto;
}