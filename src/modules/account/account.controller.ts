import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserEntity } from '../user/entities/user.entity';

@ApiTags('Account')
@Controller('api/v1/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiCreatedResponse({ description: 'Account created sucessfully' })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @ApiResponse({ status: 200, description: 'The found record', type: UserEntity })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.accountService.getProfile(req.user?.user_id);
  }
}
