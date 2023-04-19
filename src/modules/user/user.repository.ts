import { Injectable } from '@nestjs/common';
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
        cell_phone: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
        realm: {
          select: {
            realm: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return users.map((user) => ({ ...user, realm: user.realm?.realm }));
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        cell_phone: true,
        first_name: true,
        last_name: true,
        created_at: true,
        updated_at: true,
        realm: {
          select: {
            realm: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        preference: {
          select: {
            theme: true,
            currency: true,
            language: true,
            wallet: true,
          },
        },
      },
    });
    return { ...user, realm: user.realm?.realm };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        cell_phone: true,
        first_name: true,
        last_name: true,
        password: true,
        realm: {
          select: {
            realm: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return { ...user, realm: user.realm?.realm };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user` + updateUserDto;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
