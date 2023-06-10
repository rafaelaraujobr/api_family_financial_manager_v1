import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UserRepository } from '../user/user.repository';
import { PrismaService } from 'src/database/prisma.service';
import { AccountRepository } from './account.repository';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, UserRepository, PrismaService, UserService],
})
export class AccountModule {}
