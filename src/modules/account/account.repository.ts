import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UpdatePreferenceDto } from './dto/update-preference';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAccountDto: CreateAccountDto) {
    return this.prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({ data: { name: 'default' } });
      const role = await tx.role.findUnique({ where: { slug: 'user' } });
      const user = await tx.user.create({
        data: {
          ...createAccountDto,
          preference: {
            create: {
              tenant_id: tenant.id,
            },
          },
          tenants: {
            create: {
              tenant_id: tenant.id,
              role_id: role.id,
            },
          },
        },
      });
      return user;
    });
  }
  updatePreference(user_id: string, updatePreferenceDto: UpdatePreferenceDto) {
    return this.prisma.user.update({
      where: { id: user_id },
      data: {
        preference: {
          update: {
            ...updatePreferenceDto,
          },
        },
      },
    });
  }
}
