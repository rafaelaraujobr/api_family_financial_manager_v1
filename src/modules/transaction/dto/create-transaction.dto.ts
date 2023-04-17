import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusTransaction, TypeTransaction } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsUUID, IsNumber, IsDate } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Nome', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Descriçao', type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Tipo', enum: TypeTransaction })
  @IsEnum(TypeTransaction)
  @IsNotEmpty()
  type: TypeTransaction;

  @ApiPropertyOptional({ description: 'Status', enum: StatusTransaction, default: StatusTransaction.PENDING })
  @IsEnum(StatusTransaction)
  @IsOptional()
  status: StatusTransaction;

  @ApiProperty({ description: 'Valor', enum: Number })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'Id da carteira', type: String })
  @IsUUID()
  @IsNotEmpty()
  wallet_id: string;

  @ApiProperty({ description: 'Id da categoria', type: String })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({ description: 'Data da transaçao', type: Date })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  date: Date;
}
