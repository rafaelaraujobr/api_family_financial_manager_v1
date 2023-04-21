import { Controller, Post, Body, Patch, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenEntity } from './entities/token.entity';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Authentications')
@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'Access Token', type: TokenEntity })
  @Post('login')
  signIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.signIn(loginAuthDto.email, loginAuthDto.password);
  }

  @ApiResponse({ status: 200, description: 'Refresh Token', type: TokenEntity })
  @Patch('refresh-token')
  async refreshToken(@Headers('x-refresh-token') refreshToken: string): Promise<TokenEntity> {
    return await this.authService.refreshToken(refreshToken);
  }
}
