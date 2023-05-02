import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TypeWallet } from '@prisma/client';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, IsBoolean } from 'class-validator';

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

  @ApiProperty({ description: 'Valor', enum: Number })
  @IsNumber()
  @IsOptional()
  amount: number;

  @ApiPropertyOptional({ description: 'Notificar movimentação', type: Boolean })
  @IsBoolean()
  @IsOptional()
  is_notified: boolean;

  @ApiPropertyOptional({ description: 'Id do author', type: String })
  @IsString()
  @IsOptional()
  author_id: string;

  @ApiPropertyOptional({ description: 'Id do realm', type: String })
  @IsString()
  @IsOptional()
  realm_id: string;
}
