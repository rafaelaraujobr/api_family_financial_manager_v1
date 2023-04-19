import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const isMatch = await compareSync(password, user?.password);
    if (!isMatch) throw new UnauthorizedException();
    return this.generateToken(user);
  }
  async generateToken(user: any): Promise<any> {
    const payload = { sub: user.realm.id, user_id: user.id };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign({ ...payload, type: 'refresh' }, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }
  async refreshToken(refresh_token: string): Promise<any> {
    const payload = this.jwtService.verify(refresh_token);
    if (payload.type !== 'refresh') throw new UnauthorizedException();
    const user = await this.userService.findById(payload.user_id);
    return this.generateToken(user);
  }
}
