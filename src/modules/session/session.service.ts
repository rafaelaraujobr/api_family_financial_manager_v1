import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  create(createSessionDto: CreateSessionDto) {
    return 'This action adds a new session' + createSessionDto;
  }

  findAll() {
    return `This action returns all session`;
  }

  delete(user_id: string) {
    return `This action removes a #${user_id} session`;
  }
}
