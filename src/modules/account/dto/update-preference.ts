import { ApiProperty } from '@nestjs/swagger';
import { CurrencyPreferences, LanguagePreferences, ThemePreferences } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdatePreferenceDto {
  @ApiProperty({ description: 'Id do tenant padrão', type: String })
  @IsUUID()
  @IsOptional()
  tenant_id: string;

  @ApiProperty({ description: 'Tema', enum: ThemePreferences })
  @IsEnum(ThemePreferences)
  @IsOptional()
  theme: ThemePreferences;

  @ApiProperty({ description: 'Idioma', enum: LanguagePreferences })
  @IsEnum(LanguagePreferences)
  @IsOptional()
  language: LanguagePreferences;

  @ApiProperty({ description: 'Moeda', enum: CurrencyPreferences })
  @IsEnum(CurrencyPreferences)
  @IsOptional()
  currency: CurrencyPreferences;

  @ApiProperty({ description: 'Id do carteira padrão', type: String })
  @IsUUID()
  @IsOptional()
  wallet_id: string;
}
