import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { QueryCategoryDto } from './dto/query-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryCategoryDto) {
    return await this.prisma.category.findMany({
      where: {
        code: {
          startsWith: query.type === 'INCOME' ? '1' : '2',
        },
        childrens: {
          none: {},
        },
        AND: [
          {
            name: {
              contains: query.search || '',
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });
  }

  async findTree() {
    return await this.prisma.category.findMany({
      where: {
        code: {
          in: ['1', '2'],
        },
      },
      select: {
        name: true,
        code: true,
        childrens: {
          select: {
            name: true,
            code: true,
            childrens: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });
  }
}
