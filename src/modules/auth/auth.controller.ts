import { Controller, Post, Body, Patch, Headers, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenEntity } from './entities/token.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
@ApiTags('Autenticação')
@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Obter token e refresh token de acesso  ' })
  @ApiResponse({ status: 200, description: 'Token criado com sucesso!', type: TokenEntity })
  @Post('login')
  signIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.signIn(loginAuthDto.email, loginAuthDto.password);
  }

  @ApiOperation({ summary: 'Atualizar token espirados' })
  @ApiResponse({ status: 200, description: 'Token criado com sucesso!', type: TokenEntity })
  @Patch('refresh-token')
  async refreshToken(@Headers('x-refresh-token') refreshToken: string): Promise<TokenEntity> {
    return await this.authService.refreshToken(refreshToken);
  }

  @ApiOperation({ summary: 'Encerra a sessão e invalida o token' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Delete('logout')
  async logOut(@Req() req: any, @Headers() headers: string) {
    const token = headers['authorization'].replace('Bearer ', '');
    return this.authService.logOut(req.user.sub, token);
  }
}
