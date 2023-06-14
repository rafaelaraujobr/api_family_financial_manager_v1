import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
  create(createTenantDto: CreateTenantDto) {
    return 'This action adds a new tenant' + createTenantDto;
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant` + updateTenantDto;
  }

  updateDefaultTenant(id: string) {
    return `This action updates a #${id} tenant` + id;
  }

  remove(id: string) {
    return `This action removes a #${id} tenant`;
  }
}
