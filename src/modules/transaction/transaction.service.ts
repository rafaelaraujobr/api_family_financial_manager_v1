import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { type, status, wallet_id, amount } = createTransactionDto;
    if (type === 'EXPENSE' && status === 'CONCLUDED') {
      const { income, expense } = await this.transactionRepository.findWalletBalanceById(wallet_id);
      if (expense + amount > income) throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
    }
    await this.transactionRepository.create(createTransactionDto);
    return { message: 'Transaction created successfully' };
  }

  findAll(query: any) {
    if (query.not_paginated) return this.transactionRepository.findAll(query);
    return this.transactionRepository.findAllPaginator(query);
  }

  async findById(id: string) {
    return await this.transactionRepository.findById(id);
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const { status } = updateTransactionDto;
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    if (transaction.type === 'EXPENSE' && status === 'CONCLUDED') {
      const { income, expense } = await this.transactionRepository.findWalletBalanceById(transaction.wallet.id);
      if (expense + transaction.amount > income) throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
    }
    if (transaction.status === 'CONCLUDED' && status === 'PENDING' && transaction.type === 'EXPENSE')
      throw new HttpException('Transaction already concluded', HttpStatus.BAD_REQUEST);
    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
