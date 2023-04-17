import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty({ required: true, description: 'Id da categoria', type: String })
  id: string;
  @ApiProperty({ required: true, description: 'Nome da carteira', type: String })
  name: string;
  @ApiProperty({ required: true, description: 'Codigo', type: String })
  code: string;
  @ApiPropertyOptional({ required: false, description: 'Categorias filhas', type: CategoryEntity, isArray: true })
  childrens?: CategoryEntity[];
  @ApiPropertyOptional({ required: false, description: 'Categorias pais', type: CategoryEntity, isArray: false })
  parent?: CategoryEntity;
  @ApiPropertyOptional({ required: false, description: 'Data de criação', type: String })
  created_at?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de atualização', type: String })
  updated_at?: Date;
  @ApiPropertyOptional({ required: false, description: 'Data de deleção', type: String })
  deleted_at?: Date;
}
