import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { QueryWalletDto } from './dto/query-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { WalletPaginationEntity } from './entities/wallet.pagination.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Wallets')
@Controller('api/v1/wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiBody({
    type: CreateWalletDto,
    description: 'Create Wallet',
  })
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto): Promise<WalletEntity> {
    return this.walletService.create(createWalletDto);
  }

  @ApiResponse({ status: 200, type: WalletPaginationEntity || WalletEntity, description: 'Success' })
  @Get()
  async findAll(@Query() query: QueryWalletDto): Promise<WalletEntity[] | WalletPaginationEntity> {
    return await this.walletService.findAll(query);
  }

  @ApiResponse({ status: 200, type: WalletEntity, description: 'Success' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<WalletEntity | null> {
    return await this.walletService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ): Promise<WalletEntity | { message: string }> {
    return await this.walletService.update(id, updateWalletDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<WalletEntity | { message: string }> {
    return await this.walletService.remove(id);
  }
}
