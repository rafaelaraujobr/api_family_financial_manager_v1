import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user' + createUserDto;
  }
  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
        tenants: {
          select: {
            tenant: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return users;
  }
  async findById(id: string) {
    const { permissions, groups, tenants, ...user } = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
        groups: {
          select: {
            group: {
              select: {
                permissions: {
                  select: {
                    permission: {
                      select: {
                        action: true,
                        entity: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        permissions: {
          select: {
            permission: {
              select: {
                action: true,
                entity: true,
              },
            },
          },
        },
        tenants: {
          select: {
            tenant: {
              select: {
                id: true,
                name: true,
              },
            },
            role: {
              select: {
                id: true,
                name: true,
                permissions: {
                  select: {
                    permission: {
                      select: {
                        action: true,
                        entity: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        preference: {
          select: {
            theme: true,
            currency: true,
            language: true,
            main_tenant: {
              select: {
                id: true,
                name: true,
              },
            },
            main_wallet: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    const userPermissions = [
      ...permissions.map((item) => item.permission),
      ...tenants.map((item) => item.role.permissions.map((item) => item.permission)),
      ...groups.map((item) => item.group.permissions.map((item) => item.permission)),
    ].flat();
    const userTenants = [...tenants.map((item) => item.tenant)];
    return { ...user, tenants: userTenants, permissions: userPermissions };
  }
  async findByEmail(email: string) {
    try {
      const { permissions, groups, tenants, ...user } = await this.prisma.user.findFirst({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          groups: {
            select: {
              group: {
                select: {
                  permissions: {
                    select: {
                      permission: {
                        select: {
                          action: true,
                          entity: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          permissions: {
            select: {
              permission: {
                select: {
                  action: true,
                  entity: true,
                },
              },
            },
          },
          tenants: {
            select: {
              tenant: {
                select: {
                  id: true,
                  name: true,
                },
              },
              role: {
                select: {
                  id: true,
                  name: true,
                  permissions: {
                    select: {
                      permission: {
                        select: {
                          action: true,
                          entity: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          preference: {
            select: {
              main_tenant: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      const userPermissions = [
        ...permissions.map((item) => item.permission),
        ...tenants.map((item) => item.role.permissions.map((item) => item.permission)),
        ...groups.map((item) => item.group.permissions.map((item) => item.permission)),
      ].flat();
      return { ...user, permissions: userPermissions };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user` + updateUserDto;
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
