import { ApiProperty } from '@nestjs/swagger';
import { StatusTransaction, TypeTransaction } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsUUID, IsNumber, IsDate } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Nome', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descriçao', type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Tipo', enum: TypeTransaction })
  @IsEnum(TypeTransaction)
  @IsNotEmpty()
  type: TypeTransaction;

  @ApiProperty({ description: 'Status', enum: StatusTransaction })
  @IsEnum(StatusTransaction)
  @IsOptional()
  status: StatusTransaction;

  @ApiProperty({ description: 'Tipo', enum: Number })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'id da carteira', type: String })
  @IsUUID()
  @IsNotEmpty()
  wallet_id: string;

  @ApiProperty({ description: 'id da categoria', type: String })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({ description: 'Inicio data de criação', type: Date })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  date: Date;
}
