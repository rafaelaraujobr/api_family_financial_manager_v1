import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, PrismaService],
})
export class TransactionModule {}
