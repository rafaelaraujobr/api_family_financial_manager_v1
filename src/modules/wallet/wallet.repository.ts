import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { QueryWalletDto } from './dto/query-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { WalletPaginationEntity } from './entities/wallet.pagination.entity';

@Injectable()
export class WalletRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createWalletDto: CreateWalletDto): Promise<any> {
    return await this.prisma.wallet.create({
      data: createWalletDto,
    });
  }

  async findAll(query: any): Promise<WalletEntity[]> {
    const where: any = {
      deleted_at: query.deleted ? { not: null } : null,
      AND: [{ name: { contains: query.search || '', mode: 'insensitive' } }],
    };
    return await this.prisma.wallet.findMany({
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

  findById(id: string) {
    return this.prisma.wallet.findFirst({
      where: { id, deleted_at: null },
    });
  }

  update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.prisma.wallet.update({
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
