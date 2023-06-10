import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { CategoryModule } from './modules/category/category.module';
import { TargetModule } from './modules/target/target.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/user.service';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { GroupModule } from './modules/group/group.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
// import { ThrottlerGuard } from '@nestjs/throttler/dist/throttler.guard';
import { SessionModule } from './modules/session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
    // ThrottlerModule.forRoot({
    //   ttl: +process.env.THROTTLING_TIME_WINDOW,
    //   limit: +process.env.THROTTLING_MAX_REQUESTS,
    // }),
    AuthModule,
    AccountModule,
    TenantModule,
    UserModule,
    RoleModule,
    PermissionModule,
    GroupModule,
    WalletModule,
    CategoryModule,
    TargetModule,
    TransactionModule,
    NotificationModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
