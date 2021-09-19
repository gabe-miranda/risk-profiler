import {
  IsIn,
  IsInt,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { House } from '../models/house.model';
import { Vehicle } from '../models/vehicle.model';

enum MaritalStatus {
  MARRIED = 'married',
  SINGLE = 'single',
}

export class CalculateRiskDto {
  @Min(0)
  @IsInt()
  age: number;

  @Min(0)
  @IsInt()
  dependents: number;

  @ValidateNested()
  @IsOptional()
  @Type(() => House)
  house: House;

  @Min(0)
  @IsInt()
  income: number;

  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  marital_status: string;

  @IsIn([0, 1], { each: true })
  risk_questions: number[];

  @ValidateNested()
  @IsOptional()
  @Type(() => Vehicle)
  vehicle: Vehicle;
}
