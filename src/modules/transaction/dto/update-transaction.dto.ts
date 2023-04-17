import { ApiPropertyOptional } from '@nestjs/swagger';
import { StatusTransaction } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString, IsEnum, IsOptional, IsUUID, IsDate } from 'class-validator';

export class UpdateTransactionDto {
  @ApiPropertyOptional({ description: 'Nome', type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ description: 'Descriçao', type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'Status', enum: StatusTransaction })
  @IsEnum(StatusTransaction)
  @IsOptional()
  status: StatusTransaction;

  @ApiPropertyOptional({ description: 'Id da categoria', type: String })
  @IsUUID()
  @IsOptional()
  category_id: string;

  @ApiPropertyOptional({ description: 'Inicio data de criação', type: Date })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  date: Date;
}
