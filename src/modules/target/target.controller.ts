import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TargetService } from './target.service';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TargetEntity } from './entities/target.entity';
import { TargetPaginationEntity } from './entities/wallet.pagination.entity';

@ApiTags('Targets')
@Controller('api/v1/targets')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @ApiBody({
    type: CreateTargetDto,
    description: 'Criar meta',
  })
  @ApiResponse({ status: 200, type: TargetEntity, description: 'Sucesso' })
  @Post()
  async create(@Body() createTargetDto: CreateTargetDto): Promise<any> {
    return this.targetService.create(createTargetDto);
  }

  @ApiResponse({ status: 200, type: TargetPaginationEntity || TargetEntity, description: 'Sucesso' })
  @Get()
  findAll(@Query() query: any) {
    return this.targetService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.targetService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTargetDto: UpdateTargetDto) {
    return this.targetService.update(id, updateTargetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.targetService.remove(id);
  }
}
