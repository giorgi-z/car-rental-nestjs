import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true, unique: true })
  plateNo: string;

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  vehicleYear: number;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    _id: false,
  })
  contact: {
    phone: string;
    email: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
