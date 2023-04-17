import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { TypeWallet } from '@prisma/client';

export class WalletEntity {
  @ApiProperty({ required: true, description: 'Id da carteira', type: String })
  id: string;
  @ApiProperty({ required: true, description: 'Nome', type: String })
  name: string;
  @ApiPropertyOptional({ required: false, description: 'Descrição', type: String })
  description?: string;
  @ApiPropertyOptional({ required: false, description: 'Tipo', enum: TypeWallet })
  type?: TypeWallet;
  @ApiPropertyOptional({ required: false, description: 'Valor na carteira', type: Number })
  amount?: number;
  @ApiPropertyOptional({ required: false, description: 'Data de criação', type: String })
  created_at?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de atualização', type: String })
  updated_at?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de deleção', type: String })
  deleted_at?: Date;
}
