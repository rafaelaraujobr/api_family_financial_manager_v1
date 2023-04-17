import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateTargetDto {
  @ApiProperty({ description: 'Nome', type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ description: 'Descriçao', type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'Valor', type: Number })
  @IsNumber()
  @IsOptional()
  amount: number;
}
