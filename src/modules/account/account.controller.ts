import { Controller, Post, Body, Get, UseGuards, Request, Patch } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/entities/user.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdatePreferenceDto } from './dto/update-preference';

@ApiTags('Contas')
@Controller('api/v1')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Criação da conta ' })
  @ApiCreatedResponse({ description: 'Conta criada com sucesso' })
  @Post('register')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @ApiOperation({ summary: 'Perfil do usuário' })
  @ApiResponse({ status: 200, description: 'Sucesso', type: UserEntity })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.accountService.getProfile(req.user?.id);
  }

  @ApiOperation({ summary: 'Atualizare as preferencias da conta' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch('update-preference')
  updatePreference(@Request() req, @Body() updatePreferenceDto: UpdatePreferenceDto) {
    return this.accountService.updatePreference(req.user?.id, updatePreferenceDto);
  }
}
