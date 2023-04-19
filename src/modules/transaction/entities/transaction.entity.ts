import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusTransaction, TypeTransaction } from '@prisma/client';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WalletEntity } from 'src/modules/wallet/entities/wallet.entity';

export class TransactionEntity {
  @ApiProperty({ required: true, description: 'Id da transação', type: String })
  id: string;
  @ApiProperty({ required: true, description: 'Nome', type: String })
  name: string;
  @ApiPropertyOptional({ required: false, description: 'Tipo', type: UserEntity })
  author?: UserEntity;
  @ApiPropertyOptional({ required: false, description: 'Tipo', enum: TypeTransaction })
  type?: TypeTransaction;
  @ApiPropertyOptional({ required: false, description: 'Descrição', type: String })
  description?: string;
  @ApiPropertyOptional({ required: false, description: 'Status', enum: StatusTransaction })
  status?: StatusTransaction;
  @ApiPropertyOptional({ required: false, description: 'Carteira', type: WalletEntity })
  wallet?: WalletEntity;
  @ApiPropertyOptional({ required: false, description: 'Categoria', type: CategoryEntity })
  category?: CategoryEntity;
  @ApiPropertyOptional({ required: false, description: 'Data de transação', type: String })
  date?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de criação', type: String })
  created_at?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de atualização', type: String })
  updated_at?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de deleção', type: String })
  deleted_at?: Date;
}
