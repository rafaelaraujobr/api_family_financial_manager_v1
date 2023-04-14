import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TargetRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTargetDto: CreateTargetDto) {
    try {
      const target = await this.prisma.wallet.create({
        data: {
          name: createTargetDto.name,
          type: 'TARGET',
          target: {
            create: {
              name: createTargetDto.name,
              description: createTargetDto.description,
              amount: createTargetDto.amount,
            },
          },
        },
        include: {
          target: true,
        },
      });

      return {
        id: target.target.id,
        name: target.target.name,
        description: target.target.description,
        amount: target.target.amount,
        wallet: {
          id: target.id,
          name: target.name,
          type: target.type,
        },
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(query: any): Promise<any> {
    const where: any = {
      name: query.name || undefined,
      deleted_at: query.deleted ? { not: null } : null,
      AND: [{ name: { contains: query.search || '', mode: 'insensitive' } }],
    };

    return await this.prisma.target.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        amount: true,
        wallet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAllPaginator(query: any): Promise<any> {
    const page = +query.page || 1;
    const take = +query.limit || 10;
    const skip = (page - 1) * take;
    const orderBy = { [query.order || 'updated_at']: query.sort || 'desc' };
    const where: any = {
      name: query.name || undefined,
      deleted_at: query.deleted ? { not: null } : null,
      AND: [{ name: { contains: query.search || '', mode: 'insensitive' } }],
    };

    const [records, total] = await this.prisma.$transaction([
      this.prisma.target.findMany({
        where,
        skip,
        take,
        orderBy,
        select: {
          id: true,
          name: true,
          description: true,
          amount: true,
          wallet: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.target.count({ where }),
    ]);

    return { records, total, pages: Math.ceil(total / take) };
  }

  findById(id: string) {
    return `This action returns a #${id} target`;
  }

  update(id: string, updateTargetDto: UpdateTargetDto) {
    return `This action updates a #${id} target` + updateTargetDto;
  }

  remove(id: string) {
    return `This action removes a #${id} target`;
  }
}
