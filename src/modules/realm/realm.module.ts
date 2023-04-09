import { Module } from '@nestjs/common';
import { RealmService } from './realm.service';
import { RealmController } from './realm.controller';

@Module({
  controllers: [RealmController],
  providers: [RealmService]
})
export class RealmModule {}
