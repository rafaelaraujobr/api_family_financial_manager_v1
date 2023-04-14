import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { WalletEntity } from 'src/modules/wallet/entities/wallet.entity';

export class TargetEntity {
  @ApiProperty({ required: true, description: 'Id da carteira', type: String })
  id: string;
  @ApiProperty({ required: true, description: 'Nome da carteira', type: String })
  name: string;
  @ApiPropertyOptional({ required: false, description: 'Descrição da carteira', type: String })
  description?: string;
  @ApiPropertyOptional({ required: false, description: 'Valor', type: Number })
  amount?: number;
  @ApiPropertyOptional({ required: false, description: 'Carteira', type: WalletEntity })
  wallet?: WalletEntity;
  @ApiPropertyOptional({ required: false, description: 'Data de criação', type: String })
  created_at?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de atualização', type: String })
  updated_at?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de deleção', type: String })
  deleted_at?: Date;
}
