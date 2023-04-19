import { Get, Render } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { version } from '../package.json';
@ApiTags('Home')
@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { version };
  }
}
