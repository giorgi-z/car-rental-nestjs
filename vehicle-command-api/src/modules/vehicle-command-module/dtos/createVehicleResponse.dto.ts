import { ApiProperty } from "@nestjs/swagger";

export class ContactDto {
  @ApiProperty({example: '555222333'})
  phone: string;

  @ApiProperty({example: 'test@mail.com'})
  email: string;
}

export class VehicleResponseDto {
  @ApiProperty({ example: '678c8a4a4f2a4d0012e9c123' })
  id: string;

  @ApiProperty({ example: 'TE001ST' })
  plateNo: string;

  @ApiProperty({ example: 2015 })
  vehicleYear: number;

  @ApiProperty({ example: 100 })
  price: number;

  @ApiProperty({ type: () => ContactDto })
  contact: ContactDto;
}