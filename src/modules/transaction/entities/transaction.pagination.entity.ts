import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { TransactionEntity } from './transaction.entity';

export class TransactionPaginationEntity {
  @ApiProperty({ required: true, description: 'Lista de registros', isArray: true, type: TransactionEntity })
  records: TransactionEntity[];
  @ApiProperty({ required: true, description: 'Total de registros', type: Number })
  total: number;
  @ApiProperty({ required: true, description: 'Total de páginas', type: Number })
  pages: number;
}
