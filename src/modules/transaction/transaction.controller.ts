import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionPaginationEntity } from './entities/transaction.pagination.entity';
import { QueryTransactionDto } from './dto/query-transaction.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Transactions')
@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiCreatedResponse({ description: 'Transaction created successfully' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create({
      ...createTransactionDto,
      realm_id: req.user?.sub,
      author_id: req.user?.user_id,
    });
  }

  @ApiCreatedResponse({ description: 'Transaction found successfully', type: TransactionPaginationEntity })
  @Get()
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  findAll(@Query() query: QueryTransactionDto, @Request() req) {
    return this.transactionService.findAll({ ...query, realm_id: req.user?.sub });
  }

  @ApiResponse({ status: 200, type: TransactionEntity, description: 'Sucesso' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.transactionService.findById(id);
  }

  @ApiResponse({ status: 200, type: TransactionEntity, description: 'Registro atualizado com sucesso' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @ApiResponse({ status: 200, type: TransactionEntity, description: 'Registro deletado com sucesso' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
