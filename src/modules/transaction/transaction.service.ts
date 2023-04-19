import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transaction.repository';
import { WalletRepository } from '../wallet/wallet.repository';
import { TypeWallet } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly walletRepository: WalletRepository,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { type, status, wallet_id, amount, destination_wallet_id } = createTransactionDto;
    if (type === 'TRANSFER' && status === 'CONCLUDED') {
      const { income, expense, wallet } = await this.transactionRepository.findWalletBalanceById(wallet_id);
      if (expense + amount > income) throw new BadRequestException('Insufficient funds');
      if (wallet.type !== TypeWallet.DEBIT_CARD && wallet.type !== TypeWallet.CASH)
        throw new BadRequestException('Wallet type must be debit');
      const destination_wallet = await this.walletRepository.findById(destination_wallet_id);
      if (destination_wallet.type !== TypeWallet.DEBIT_CARD && destination_wallet.type !== TypeWallet.CASH)
        throw new BadRequestException('Wallet type must be debit');
    }
    if (type === 'EXPENSE' && status === 'CONCLUDED') {
      const { income, expense } = await this.transactionRepository.findWalletBalanceById(wallet_id);
      if (expense + amount > income) throw new BadRequestException('Insufficient funds');
    }
    if (type === 'TRANSFER') await this.transactionRepository.createTransfer(createTransactionDto);
    else await this.transactionRepository.create(createTransactionDto);
    return { message: 'Transaction created successfully' };
  }

  async findAll(query: any) {
    if (query.not_paginated) return await this.transactionRepository.findAll(query);
    return await this.transactionRepository.findAllPaginator(query);
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

  async remove(id: string) {
    return await this.transactionRepository.remove(id);
  }
}
