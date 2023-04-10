import { TypeWallet } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(TypeWallet)
  @IsNotEmpty()
  type: TypeWallet;
}
