import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CurrencyPreferences, LanguagePreferences, ThemePreferences } from '@prisma/client';

export class PreferenceEntity {
  @ApiPropertyOptional({ required: true, description: 'Idioma', enum: LanguagePreferences })
  language: LanguagePreferences;
  @ApiPropertyOptional({ required: true, description: 'Moeda', enum: CurrencyPreferences })
  currency: CurrencyPreferences;
  @ApiPropertyOptional({ required: true, description: 'Data de criação', enum: ThemePreferences })
  theme: ThemePreferences;
}
export class UserEntity {
  @ApiProperty({ required: true, description: 'Id do usuário', type: String })
  id: string;
  @ApiPropertyOptional({ required: true, description: 'Nome', type: String })
  first_name: string;
  @ApiPropertyOptional({ required: true, description: 'Sobrenome', type: String })
  last_name: string;
  @ApiPropertyOptional({ required: true, description: 'Email', type: String })
  email: string;
  @ApiPropertyOptional({ required: true, description: 'Celular', type: String })
  cell_phone: string;
  @ApiPropertyOptional({ required: true, description: 'Senha', type: String })
  password?: string;
  //   @ApiPropertyOptional({ required: true, description: 'Senha', type: RealmEntity })
  //   realm?: RealmEntity;
  @ApiPropertyOptional({ required: true, description: 'Senha', type: PreferenceEntity })
  preference?: PreferenceEntity;
  @ApiProperty({ required: true, description: 'Data de criação', type: String })
  created_at: Date;
  @ApiPropertyOptional({ required: true, description: 'Data de atualização', type: String })
  updated_at: Date;
}
