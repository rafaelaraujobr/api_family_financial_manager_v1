import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenEntity } from './entities/token.entity';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Authentications')
@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'The access token', type: TokenEntity })
  @Post('login')
  signIn(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.signIn(loginAuthDto.email, loginAuthDto.password);
  }

  // @ApiResponse({ status: 200, description: 'Update access token', type: TokenEntity })
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
