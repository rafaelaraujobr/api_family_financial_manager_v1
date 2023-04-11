import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { TypeWallet } from '@prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
export class QueryWalletDto {
  @ApiPropertyOptional({ description: 'Nome', type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Tipo', enum: TypeWallet })
  @IsEnum(TypeWallet)
  @IsOptional()
  type?: TypeWallet;

  @ApiPropertyOptional({ description: 'Campo de busca', type: String })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Itens apagados', type: String })
  @IsString()
  @IsOptional()
  deleted?: string;

  @ApiPropertyOptional({ description: 'Inicio data de criação', type: String })
  @IsString()
  @IsOptional()
  start_date?: string;

  @ApiPropertyOptional({ description: 'Final data de criação', type: String })
  @IsString()
  @IsOptional()
  end_date?: string;

  @ApiPropertyOptional({ description: 'Retorna registro paginado', type: String })
  @IsString()
  @IsOptional()
  paginator?: string;

  @ApiPropertyOptional({ description: 'Pagina', type: String })
  @IsString()
  @IsOptional()
  @Transform((value: any) => value && parseInt(value, 10))
  page?: string;

  @ApiPropertyOptional({ description: 'Limite de registros', type: String })
  @IsString()
  @IsOptional()
  limit?: string;

  @ApiPropertyOptional({ description: 'asc | desc', type: String })
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({ description: 'atributo', type: String })
  @IsString()
  @IsOptional()
  order: string;
}
