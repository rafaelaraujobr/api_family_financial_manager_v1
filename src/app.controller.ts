import { Get, Render } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { version } from '../package.json';
@ApiTags('Home')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Tela de apresentaçao da documentaçao' })
  @Get()
  @Render('index')
  root() {
    return { version };
  }
}
