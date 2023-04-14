import { Injectable } from '@nestjs/common';
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
    return await this.prisma.wallet.create({
      data: createWalletDto,
    });
  }

  async findAll(query: QueryWalletDto): Promise<WalletEntity[]> {
    const where: any = {
      name: query.name || undefined,
      type: query.type || undefined,
      deleted_at: query.deleted ? { not: null } : null,
      created_at: query.start_date && query.end_date ? { gte: query.start_date, lte: query.end_date } : undefined,
      AND: [{ name: { contains: query.search || '', mode: 'insensitive' } }],
    };
    const orderBy = { [query.order || 'updated_at']: query.sort || 'desc' };
    return await this.prisma.wallet.findMany({
      orderBy,
      where,
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findAllPaginator(query: QueryWalletDto): Promise<WalletPaginationEntity> {
    const page = +query.page || 1;
    const take = +query.limit || 10;
    const skip = (page - 1) * take;
    const orderBy = { [query.order || 'updated_at']: query.sort || 'desc' };
    const where: any = {
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
      }),
      this.prisma.wallet.count({ where }),
    ]);
    return { records, total, pages: Math.ceil(total / take) };
  }

  async findById(id: string): Promise<WalletEntity> {
    const [wallet, balance] = await Promise.all([
      this.prisma.wallet.findUnique({
        where: { id },
      }),
      this.transactionRepository.findWalletBalanceById(id),
    ]);
    return { ...wallet, amount: balance.income - balance.expense };
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.prisma.wallet.update({
      where: { id },
      data: updateWalletDto,
    });
  }

  async totalAmount() {
    return true;
  }

  remove(id: string) {
    return this.prisma.wallet.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
