import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';

@ApiTags('Transactions')
@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiCreatedResponse({ description: 'Transaction created successfully' })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @ApiCreatedResponse({ description: 'Transaction found successfully' })
  @Get()
  findAll(@Query() query: any) {
    return this.transactionService.findAll(query);
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
