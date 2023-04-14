import { ApiProperty } from '@nestjs/swagger';
import { StatusTransaction } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString, IsEnum, IsOptional, IsUUID, IsDate } from 'class-validator';

export class UpdateTransactionDto {
  @ApiProperty({ description: 'Nome', type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Descriçao', type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Status', enum: StatusTransaction })
  @IsEnum(StatusTransaction)
  @IsOptional()
  status: StatusTransaction;

  @ApiProperty({ description: 'id da categoria', type: String })
  @IsUUID()
  @IsOptional()
  category_id: string;

  @ApiProperty({ description: 'Inicio data de criação', type: Date })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  date: Date;
}
