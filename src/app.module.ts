import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealmModule } from './modules/realm/realm.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { CategoryModule } from './modules/category/category.module';
import { TargetModule } from './modules/target/target.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [RealmModule, UserModule, WalletModule, CategoryModule, TargetModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
