import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";

export class ContactDto {
  @IsString()
  @ApiProperty({example: '555222333'})
  phone: string;

  @IsEmail()
  @ApiProperty({example: 'test@mail.com'})
  email: string;
}

export class CreateVehicleDto{
    @IsString()
    @ApiProperty({example: 'TE001ST'})
    plateNo: string;

    @IsInt()
    @ApiProperty({example: 2015})
    vehicleYear: number;

    @IsNumber()
    @ApiProperty({example: 100})
    price: number;

    @ValidateNested()
    @Type(() => ContactDto)
    @ApiProperty({type: () => ContactDto})
    contact: ContactDto;
}