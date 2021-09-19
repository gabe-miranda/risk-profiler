import { IsInt, Min } from 'class-validator';

export class Vehicle {
  @Min(0)
  @IsInt()
  year: number;
}
