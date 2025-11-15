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

  @ApiProperty({ example: 'BYD' })
  make: string;

  @ApiProperty({ example: 'Qin Plus' })
  model: string;

  @ApiProperty({ example: 2015 })
  vehicleYear: number;

  @ApiProperty({ example: 100 })
  price: number;

  @ApiProperty({ type: () => ContactDto })
  contact: ContactDto;
  
  @ApiProperty({ example: '2025-11-13T12:34:56.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-11-13T12:34:56.000Z' })
  updatedAt: Date;
}