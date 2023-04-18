import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { QueryWalletDto } from './dto/query-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { WalletPaginationEntity } from './entities/wallet.pagination.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Wallets')
@Controller('api/v1/wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiBody({
    type: CreateWalletDto,
    description: 'Criar carteira',
  })
  @ApiResponse({ status: 201, type: WalletEntity, description: 'Sucesso' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createWalletDto: CreateWalletDto): Promise<WalletEntity> {
    return this.walletService.create(createWalletDto);
  }

  @ApiResponse({ status: 200, type: WalletEntity, description: 'Sucesso' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string, @Request() req): Promise<WalletEntity | null> {
    return await this.walletService.findById(id, req.user?.sub);
  }

  @ApiResponse({ status: 200, type: WalletPaginationEntity || WalletEntity, description: 'Sucesso' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req, @Query() query: QueryWalletDto): Promise<WalletEntity[] | WalletPaginationEntity> {
    return await this.walletService.findAll({ ...query, realm_id: req.user?.sub });
  }

  @ApiResponse({ status: 200, type: WalletEntity, description: 'Atualizado com sucesso' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateWalletDto: UpdateWalletDto,
  ): Promise<WalletEntity | { message: string }> {
    return await this.walletService.update(id, req.user?.sub, updateWalletDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Request() req): Promise<WalletEntity | { message: string }> {
    return await this.walletService.remove(id, req.user?.sub);
  }
}
