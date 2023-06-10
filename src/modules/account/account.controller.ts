import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entities/user.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Contas')
@Controller('api/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Criação da conta ' })
  @ApiCreatedResponse({ description: 'Conta criada com sucesso' })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @ApiResponse({ status: 200, description: 'The found record', type: UserEntity })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.accountService.getProfile(req.user?.id);
  }
}
