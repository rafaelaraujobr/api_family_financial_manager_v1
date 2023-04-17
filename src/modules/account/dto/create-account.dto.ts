import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class CreateAccountDto {
  @ApiProperty({ description: 'first_name', type: String, required: true, example: 'Rafael' })
  @IsString({ message: 'first_name must be a string' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: 'first_name', type: String, required: true, example: 'Araujo' })
  @IsString({ message: 'last_name must be a string' })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ description: 'first_name', type: String, required: true, example: 'rafael@email.com' })
  @IsEmail({}, { message: 'invalid email' })
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ description: 'cell_phone', type: String, example: '21982222393' })
  @IsString({ message: 'cell_phone must be a string' })
  @IsOptional()
  cell_phone?: string;

  @ApiProperty({ description: 'password', type: String, required: true, example: 'Mudar@123' })
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, { message: 'password too weak' })
  password: string;
}
