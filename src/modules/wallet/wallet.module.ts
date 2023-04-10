import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaService } from 'src/database/prisma.service';
import { WalletRepository } from './wallet.repository';

@Module({
  controllers: [WalletController],
  providers: [WalletService, PrismaService, WalletRepository],
})
export class WalletModule {}
