import { TypeWallet } from '@prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class QueryWalletDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(TypeWallet)
  @IsOptional()
  type: TypeWallet;

  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  deleted: string;

  @IsString()
  @IsOptional()
  start_date: string;

  @IsString()
  @IsOptional()
  end_date: string;

  @IsString()
  @IsOptional()
  paginator: string;

  @IsString()
  @IsOptional()
  page: string;

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
