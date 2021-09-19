import { IsEnum, IsNotEmpty } from 'class-validator';

enum OwnershipStatus {
  OWNED = 'owned',
  MORTGAGED = 'mortgaged',
}

export class House {
  @IsEnum(OwnershipStatus)
  @IsNotEmpty()
  ownership_status: string;
}
