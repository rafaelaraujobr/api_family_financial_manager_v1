import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { type, status, wallet_id, amount } = createTransactionDto;
    if (type === 'TRANSFER' && status === 'CONCLUDED') {
      const { income, expense } = await this.transactionRepository.findWalletBalanceById(wallet_id);
      if (expense + amount > income) throw new BadRequestException('Insufficient funds');
      await this.transactionRepository.createTransfer(createTransactionDto);
    }
    if (type === 'EXPENSE' && status === 'CONCLUDED') {
      const { income, expense } = await this.transactionRepository.findWalletBalanceById(wallet_id);
      if (expense + amount > income) throw new BadRequestException('Insufficient funds');
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
    if (!transaction) throw new BadRequestException('Transaction not found');
    if (transaction.type === 'EXPENSE' && status === 'CONCLUDED') {
      const { income, expense } = await this.transactionRepository.findWalletBalanceById(transaction.wallet.id);
      if (expense + transaction.amount > income) throw new BadRequestException('Insufficient funds');
    }
    if (transaction.status === 'CONCLUDED' && status === 'PENDING' && transaction.type === 'EXPENSE')
      throw new BadRequestException('Transaction already concluded');
    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  remove(id: string) {
    return this.transactionRepository.remove(id);
  }
}
