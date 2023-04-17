import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { WalletEntity } from './wallet.entity';

export class WalletPaginationEntity {
  @ApiProperty({ required: true, description: 'Lista de registros', isArray: true, type: WalletEntity })
  records: WalletEntity[];
  @ApiProperty({ required: true, description: 'Total de registros', type: Number })
  total: number;
  @ApiProperty({ required: true, description: 'Total de páginas', type: Number })
  pages: number;
}
