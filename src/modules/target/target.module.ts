import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TargetRepository } from './target.repository';

@Module({
  controllers: [TargetController],
  providers: [TargetService, TargetRepository, PrismaService],
})
export class TargetModule {}
