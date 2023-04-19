import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { QueryWalletDto } from './dto/query-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { WalletPaginationEntity } from './entities/wallet.pagination.entity';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}
  async create(createWalletDto: CreateWalletDto): Promise<WalletEntity> {
    return await this.walletRepository.create(createWalletDto);
  }

  async findAll(query: QueryWalletDto): Promise<WalletEntity[] | WalletPaginationEntity> {
    if (query.not_paginated) return await this.walletRepository.findAll(query);
    return await this.walletRepository.findAllPaginator(query);
  }

  async findById(id: string): Promise<WalletEntity> {
    return this.walletRepository.findById(id);
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<WalletEntity | { message: string }> {
    if (this.walletRepository.findById(id)) return this.walletRepository.update(id, updateWalletDto);
    else throw new BadRequestException('Wallet not found');
  }

  async remove(id: string): Promise<WalletEntity | { message: string }> {
    if (this.walletRepository.findById(id)) return this.walletRepository.remove(id);
    else throw new BadRequestException('Wallet not found');
  }
}
