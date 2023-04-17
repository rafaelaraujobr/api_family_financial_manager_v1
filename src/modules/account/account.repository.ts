import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAccountDto: CreateAccountDto) {
    return this.prisma.$transaction(async (tx) => {
      const realm = await tx.realm.create({ data: { name: 'default' } });
      const user = await tx.user.create({
        data: {
          ...createAccountDto,
          preference: {
            create: {
              realm_id: realm.id,
            },
          },
          realm: {
            create: {
              realm_id: realm.id,
            },
          },
          wallets: {
            create: {
              realm_id: realm.id,
              name: 'default',
              type: 'OTHER',
            },
          },
        },
      });
      return user;
    });
  }
}
