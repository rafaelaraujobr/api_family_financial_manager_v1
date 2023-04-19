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
  createTransfer(createTransactionDto: CreateTransactionDto) {
    const { destination_wallet_id } = createTransactionDto;
    delete createTransactionDto.destination_wallet_id;
    return this.prisma.transaction.createMany({
      data: [
        {
          ...createTransactionDto,
          type: 'INCOME',
          wallet_id: destination_wallet_id,
        },
        {
          ...createTransactionDto,
          type: 'EXPENSE',
        },
      ],
    });
  }
  async findWalletBalanceById(wallet_id: string) {
    const [income, expense] = await this.prisma.$transaction([
      this.prisma.transaction.aggregate({
        where: {
          wallet_id,
          status: 'CONCLUDED',
          type: 'INCOME',
        },
        _sum: {
          amount: true,
        },
      }),
      this.prisma.transaction.aggregate({
        where: {
          wallet_id,
          status: 'CONCLUDED',
          type: 'EXPENSE',
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return { income: income['_sum'].amount, expense: expense['_sum'].amount };
  }
  async findAll(query: any) {
    const where: any = {
      realm_id: query.realm_id,
      name: query.name || undefined,
      type: query.type || undefined,
      status: query.status || undefined,
      created_at: query.start_date && query.end_date ? { gte: query.start_date, lte: query.end_date } : undefined,
      AND: [{ name: { contains: query.search || '', mode: 'insensitive' } }],
    };
    return await this.prisma.transaction.findMany({
      where,
      select: {
        id: true,
        name: true,
        type: true,
        status: true,
        amount: true,
        date: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        wallet: {
          select: {
            id: true,
            name: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  }
  async findAllPaginator(query: any) {
    const page = +query.page || 1;
    const take = +query.limit || 10;
    const skip = (page - 1) * take;
    const orderBy = { [query.order || 'updated_at']: query.sort || 'desc' };
    const where: any = {
      realm_id: query.realm_id,
      name: query.name || undefined,
      type: query.type || undefined,
      status: query.status || undefined,
      created_at: query.start_date && query.end_date ? { gte: query.start_date, lte: query.end_date } : undefined,
      AND: [{ name: { contains: query.search || '', mode: 'insensitive' } }],
    };
    const [records, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        skip,
        take,
        orderBy,
        select: {
          id: true,
          name: true,
          type: true,
          status: true,
          amount: true,
          date: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          wallet: {
            select: {
              id: true,
              name: true,
            },
          },
          created_at: true,
          updated_at: true,
        },
      }),
      this.prisma.transaction.count({ where }),
    ]);
    return { records, total, pages: Math.ceil(total / take) };
  }
  async findById(id: string) {
    return await this.prisma.transaction.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        status: true,
        amount: true,
        category: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        wallet: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        realm: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        date: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return await this.prisma.transaction.update({
      where: { id },
      data: { ...updateTransactionDto },
    });
  }
  async removeTransfer(wallet_id: string, destination_wallet_id: string) {
    return await this.prisma.transaction.deleteMany({
      where: { id: { in: [wallet_id, destination_wallet_id] } },
    });
  }
  async remove(id: string) {
    return await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
