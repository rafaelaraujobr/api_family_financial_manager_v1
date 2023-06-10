import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { QueryWalletDto } from './dto/query-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { WalletPaginationEntity } from './entities/wallet.pagination.entity';
import { TransactionRepository } from '../transaction/transaction.repository';

@Injectable()
export class WalletRepository {
  constructor(private readonly prisma: PrismaService, private readonly transactionRepository: TransactionRepository) {}
  async create(createWalletDto: CreateWalletDto): Promise<any> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const { amount } = createWalletDto;
        delete createWalletDto.amount;
        const wallet = await tx.wallet.create({
          data: { ...createWalletDto },
        });
        if (amount > 0) {
          const category = await tx.category.findFirst({ where: { code: '1.1.3' } });
          await tx.transaction.create({
            data: {
              name: createWalletDto.name,
              amount: amount,
              type: 'INCOME',
              status: 'CONCLUDED',
              wallet_id: wallet.id,
              date: new Date(),
              author_id: createWalletDto.author_id,
              category_id: category.id,
              tenant_id: createWalletDto.tenant_id,
            },
          });
        }
        return wallet;
      });
    } catch (error) {
      if (error.code === 'P2002') throw new BadRequestException('Wallet already exists');
      else throw new BadRequestException(error);
    }
  }

  async findAll(query: QueryWalletDto): Promise<WalletEntity[]> {
    const where: any = {
      tenant_id: query.tenant_id || undefined,
      name: query.name || undefined,
      type: query.type || undefined,
      deleted_at: query.deleted ? { not: null } : null,
      created_at: query.start_date && query.end_date ? { gte: query.start_date, lte: query.end_date } : undefined,
      AND: [{ name: { contains: query.search || '', mode: 'insensitive' } }],
    };
    const orderBy = { [query.order || 'updated_at']: query.sort || 'desc' };
    try {
      const wallets = await this.prisma.wallet.findMany({
        orderBy,
        where,
        select: {
          id: true,
          name: true,
          type: true,
          transactions: {
            select: {
              amount: true,
              type: true,
              status: true,
            },
          },
        },
      });
      return wallets.map(({ transactions, ...item }) => ({
        ...item,
        amount: transactions
          .filter((item) => item.status === 'CONCLUDED')
          .reduce((acc, cur) => {
            if (cur.type === 'INCOME') return acc + cur.amount;
            else return acc - cur.amount;
          }, 0),
      }));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAllPaginator(query: QueryWalletDto): Promise<WalletPaginationEntity> {
    const page = +query.page || 1;
    const take = +query.limit || 10;
    const skip = (page - 1) * take;
    const orderBy = { [query.order || 'updated_at']: query.sort || 'desc' };
    const where: any = {
      tenant_id: query.tenant_id || undefined,
      deleted_at: query.deleted ? { not: null } : null,
      created_at: query.start_date && query.end_date ? { gte: query.start_date, lte: query.end_date } : undefined,
      AND: [{ name: { contains: query.search || '', mode: 'insensitive' } }],
    };
    const [records, total] = await Promise.all([
      this.prisma.wallet.findMany({
        where,
        skip,
        take,
        orderBy,
        select: {
          id: true,
          name: true,
          type: true,
          author: { select: { id: true, first_name: true, last_name: true } },
          created_at: true,
          updated_at: true,
          transactions: {
            select: {
              amount: true,
              type: true,
              status: true,
            },
          },
        },
      }),
      this.prisma.wallet.count({ where }),
    ]);
    return {
      records: records.map(({ transactions, ...item }) => {
        return {
          ...item,
          amount: transactions
            .filter((item) => item.status === 'CONCLUDED')
            .reduce((acc, cur) => {
              if (cur.type === 'INCOME') return acc + cur.amount;
              else return acc - cur.amount;
            }, 0),
        };
      }),
      total,
      pages: Math.ceil(total / take),
    };
  }

  async findById(id: string): Promise<WalletEntity> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        author: { select: { id: true, first_name: true, last_name: true } },
        created_at: true,
        updated_at: true,
        transactions: {
          select: {
            id: true,
            name: true,
            amount: true,
            type: true,
            status: true,
            date: true,
            category: { select: { id: true, name: true, code: true } },
          },
        },
      },
    });
    return {
      ...wallet,
      amount: wallet.transactions
        .filter((item) => item.status === 'CONCLUDED')
        .reduce((acc, cur) => {
          if (cur.type === 'INCOME') return acc + cur.amount;
          else return acc - cur.amount;
        }, 0),
    };
    // const [wallet, balance] = await Promise.all([
    //   this.prisma.wallet.findUnique({
    //     where: { id },
    //     select: {
    //       id: true,
    //       name: true,
    //       type: true,
    //       author: { select: { id: true, first_name: true, last_name: true } },
    //       created_at: true,
    //       updated_at: true,
    //       transactions: {
    //         select: {
    //           id: true,
    //           name: true,
    //           type: true,
    //           amount: true,
    //         },
    //       },
    //     },
    //   }),
    //   this.transactionRepository.findWalletBalanceById(id),
    // ]);
    // return { ...wallet, amount: balance.income - balance.expense };
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.prisma.wallet.findUnique({ where: { id } });
    if (!wallet) return { message: 'Wallet not found' };
    return await this.prisma.wallet.update({
      where: { id },
      data: updateWalletDto,
    });
  }

  remove(id: string) {
    return this.prisma.wallet.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
