import { IsEnum, IsNotEmpty } from 'class-validator';

export enum OwnershipStatus {
  OWNED = 'owned',
  MORTGAGED = 'mortgaged',
  RENTED = 'rented',
}

export class House {
  @IsEnum(OwnershipStatus)
  @IsNotEmpty()
  ownership_status: string;
}
