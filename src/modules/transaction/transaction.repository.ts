import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
      },
    });
  }

  async findWalletBalanceById(wallet_id: string) {
    const [income, expense] = await this.prisma.$transaction([
      this.prisma.transaction.aggregate({
        where: {
          wallet_id,
          type: 'INCOME',
        },
        _sum: {
          amount: true,
        },
      }),
      this.prisma.transaction.aggregate({
        where: {
          wallet_id,
          type: 'EXPENSE',
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return { income: income['_sum'].amount, expense: expense['_sum'].amount };
  }

  findAll() {
    return this.prisma.transaction.findMany();
  }

  findById(id: string) {
    return `This action returns a #${id} transaction`;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction` + updateTransactionDto;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
