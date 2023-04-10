import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateTargetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;
}
