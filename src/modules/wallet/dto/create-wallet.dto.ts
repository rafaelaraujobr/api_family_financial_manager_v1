import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeWallet } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ description: 'Nome', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Descriçao', type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Tipo', enum: TypeWallet })
  @IsEnum(TypeWallet)
  @IsNotEmpty()
  type: TypeWallet;
}
