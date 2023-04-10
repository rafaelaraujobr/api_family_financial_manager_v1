import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { TypeWallet } from '@prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class QueryWalletDto {
  @ApiProperty({ required: false, description: 'Nome da carteira', type: String })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false, description: 'Tipo da carteira', type: String })
  @IsEnum(TypeWallet)
  @IsOptional()
  type: TypeWallet;

  @ApiProperty({ required: false, description: 'Campo de busca', type: String })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({ required: false, description: 'Itens apagados', type: String })
  @IsString()
  @IsOptional()
  deleted: string;

  @ApiProperty({ required: false, description: 'Inicio data de criação', type: String })
  @IsString()
  @IsOptional()
  start_date: string;

  @ApiProperty({ required: false, description: 'Final data de criação', type: String })
  @IsString()
  @IsOptional()
  end_date: string;

  @ApiProperty({ required: false, example: 'true', description: 'Retorna registro paginado', type: String })
  @IsString()
  @IsOptional()
  paginator: string;

  @ApiProperty({ required: false, description: 'Pagina', type: String })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({ required: false, description: 'Limite de registros', type: String })
  @IsString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  sort: string;

  @IsString()
  @IsOptional()
  order: string;
}
