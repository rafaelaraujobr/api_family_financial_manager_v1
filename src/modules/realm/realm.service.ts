import { Injectable } from '@nestjs/common';
import { CreateRealmDto } from './dto/create-realm.dto';
import { UpdateRealmDto } from './dto/update-realm.dto';

@Injectable()
export class RealmService {
  create(createRealmDto: CreateRealmDto) {
    return 'This action adds a new realm';
  }

  findAll() {
    return `This action returns all realm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} realm`;
  }

  update(id: number, updateRealmDto: UpdateRealmDto) {
    return `This action updates a #${id} realm`;
  }

  remove(id: number) {
    return `This action removes a #${id} realm`;
  }
}
