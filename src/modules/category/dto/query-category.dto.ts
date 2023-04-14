import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { IsString, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';

enum TypeCategory {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TREE = 'TREE',
}

export class QueryCategoryDto {
  @ApiProperty({ description: 'Tipo', enum: TypeCategory })
  @IsNotEmpty()
  @IsEnum(TypeCategory)
  type: TypeCategory;
  @ApiPropertyOptional({ description: 'Campo de busca', type: String })
  @IsString()
  @IsOptional()
  search?: string;
}
