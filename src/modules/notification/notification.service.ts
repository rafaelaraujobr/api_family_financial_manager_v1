import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  findAll() {
    return `This action returns all notification`;
  }

  findById(id: string) {
    return `This action returns a #${id} notification`;
  }

  remove(id: string) {
    return `This action removes a #${id} notification`;
  }
}
