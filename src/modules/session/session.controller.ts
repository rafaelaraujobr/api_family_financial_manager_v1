import { Controller, Get } from '@nestjs/common';
import { SessionService } from './session.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seções')
@Controller('api/v1/sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }
}
