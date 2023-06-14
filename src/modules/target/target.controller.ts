import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TargetService } from './target.service';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TargetEntity } from './entities/target.entity';
import { TargetPaginationEntity } from './entities/target.pagination.entity';

@ApiTags('Metas')
@Controller('api/v1/targets')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @ApiOperation({ summary: 'Criar meta' })
  @ApiResponse({ status: 200, type: TargetEntity, description: 'Sucesso' })
  @Post()
  async create(@Body() createTargetDto: CreateTargetDto): Promise<any> {
    return this.targetService.create(createTargetDto);
  }

  @ApiOperation({ summary: 'Listar metas' })
  @ApiResponse({ status: 200, type: TargetPaginationEntity || TargetEntity, description: 'Sucesso' })
  @Get()
  async findAll(@Query() query: any): Promise<any> {
    return this.targetService.findAll(query);
  }

  @ApiOperation({ summary: 'Visualizar detalhes das metas' })
  @ApiResponse({ status: 200, type: TargetEntity, description: 'Sucesso' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<any> {
    return this.targetService.findById(id);
  }

  @ApiOperation({ summary: 'Atualizar meta' })
  @ApiResponse({ status: 200, type: TargetEntity, description: 'Registro atualizado com sucesso' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTargetDto: UpdateTargetDto): Promise<any> {
    return this.targetService.update(id, updateTargetDto);
  }

  @ApiOperation({ summary: 'Deletar meta' })
  @ApiResponse({ status: 200, type: TargetEntity, description: 'Registro deletado com sucesso' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.targetService.remove(id);
  }
}
