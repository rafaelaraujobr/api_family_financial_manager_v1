import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { TypeWallet } from '@prisma/client';

export class WalletEntity {
  @ApiProperty({ required: true, description: 'Id da carteira', type: String })
  id: string;
  @ApiProperty({ required: true, description: 'Nome da carteira', type: String })
  name: string;
  @ApiProperty({ required: false, description: 'Descrição da carteira', type: String })
  description?: string;
  @ApiProperty({ required: false, description: 'Tipo da carteira', enum: TypeWallet })
  type?: TypeWallet;
  @ApiProperty({ required: false, description: 'Data de criação', type: String })
  created_at?: Date;
  @ApiProperty({ required: false, description: 'Data de atualização', type: String })
  updated_at?: Date;
  @ApiProperty({ required: false, description: 'Data de deleção', type: String })
  deleted_at?: Date;
}
