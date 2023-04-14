import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RealmService } from './realm.service';
import { CreateRealmDto } from './dto/create-realm.dto';
import { UpdateRealmDto } from './dto/update-realm.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Realms')
@Controller('api/v1/realms')
export class RealmController {
  constructor(private readonly realmService: RealmService) {}

  @Post()
  create(@Body() createRealmDto: CreateRealmDto) {
    return this.realmService.create(createRealmDto);
  }

  @Get()
  findAll() {
    return this.realmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRealmDto: UpdateRealmDto) {
    return this.realmService.update(+id, updateRealmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realmService.remove(+id);
  }
}
