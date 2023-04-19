import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { PrismaService } from 'src/database/prisma.service';
import { WalletRepository } from '../wallet/wallet.repository';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, PrismaService, WalletRepository],
})
export class TransactionModule {}
