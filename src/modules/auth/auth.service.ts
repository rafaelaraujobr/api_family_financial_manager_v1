import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, password: string): Promise<any> {
    const { password: passwordUser, ...user } = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const isMatch = await compareSync(password, passwordUser);
    if (!isMatch) throw new UnauthorizedException();
    await this.cacheManager.set(user.id, user, 60 * 60 * 24);
    const tokens = await this.generateToken(user.id);
    return tokens;
  }
  async generateToken(user_id: string): Promise<any> {
    const payload = { sub: user_id };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign({ ...payload, type: 'refresh' }, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }
  async refreshToken(refresh_token: string): Promise<any> {
    const payload = this.jwtService.verify(refresh_token);
    if (payload.type !== 'refresh') throw new UnauthorizedException();
    const user = await this.userService.findById(payload.user_id);
    return this.generateToken(user.id);
  }

  async logOut(user_id: string, token: string): Promise<any> {
    try {
      const blackListToken: string[] | undefined | null = await this.cacheManager.get('black_list_token');
      await this.cacheManager.set(
        'black_list_token',
        blackListToken ? [...blackListToken, token] : [token],
        60 * 60 * 1000 * 24,
      );
      await this.cacheManager.del(user_id);
      return { message: 'Logout successfully' };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
