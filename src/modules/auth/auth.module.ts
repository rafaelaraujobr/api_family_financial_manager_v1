import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_ACCESS_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
