import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class CreateAccountDto {
  @ApiProperty({ description: 'first_name', type: String, required: true, example: 'Rafael' })
  @IsString({ message: 'first_name must be a string' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: 'first_name', type: String, required: true, example: 'Araujo' })
  @IsString({ message: 'last_name must be a string' })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ description: 'first_name', type: String, required: true, example: 'rflaraujodev@gmail.com' })
  @IsEmail({}, { message: 'invalid email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'password', type: String, required: true, example: 'Mudar@123' })
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, { message: 'password too weak' })
  password: string;
}
