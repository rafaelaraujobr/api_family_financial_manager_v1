import { Get, Render } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { version } from '../package.json';
@ApiTags('Apresentaçao')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Tela de apresentaçao da api' })
  @Get()
  @Render('index')
  root() {
    return { version };
  }
}
