import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { TargetEntity } from './target.entity';

export class TargetPaginationEntity {
  @ApiProperty({ required: true, description: 'Lista de registros', type: [TargetEntity] })
  records: TargetEntity[];
  @ApiProperty({ required: true, description: 'Total de registros', type: Number })
  total: number;
  @ApiProperty({ required: true, description: 'Total de páginas', type: Number })
  pages: number;
}
