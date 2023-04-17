import { ApiPropertyOptional } from '@nestjs/swagger';
import { TypeWallet } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class UpdateWalletDto {
  @ApiPropertyOptional({ description: 'Nome', type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ description: 'Descriçao', type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'Tipo', enum: TypeWallet })
  @IsEnum(TypeWallet)
  @IsNotEmpty()
  type: TypeWallet;
}
