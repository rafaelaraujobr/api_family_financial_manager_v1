import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionPaginationEntity } from './entities/transaction.pagination.entity';
import { QueryTransactionDto } from './dto/query-transaction.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
@ApiTags('Transações')
@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Criar transação' })
  @ApiCreatedResponse({ description: 'Transação criada com sucesso!' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create({
      ...createTransactionDto,
      tenant_id: req.user?.main_tenant.id,
      author_id: req.user?.id,
    });
  }

  @ApiOperation({ summary: 'Listar transações' })
  @ApiResponse({ status: 200, description: 'Sucesso', type: TransactionPaginationEntity })
  @Get()
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  findAll(@Query() query: QueryTransactionDto, @Request() req) {
    return this.transactionService.findAll({ ...query, tenant_id: req.user?.main_tenant.id });
  }

  @ApiOperation({ summary: 'Visualizar detalhes da transação' })
  @ApiResponse({ status: 200, type: TransactionEntity, description: 'Sucesso' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.transactionService.findById(id);
  }

  @ApiOperation({ summary: 'Atualizar transação' })
  @ApiResponse({ status: 200, type: TransactionEntity, description: 'Registro atualizado com sucesso' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @ApiOperation({ summary: 'Deletar transação' })
  @ApiResponse({ status: 200, type: TransactionEntity, description: 'Registro deletado com sucesso' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
