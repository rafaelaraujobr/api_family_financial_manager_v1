import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user' + createUserDto;
  }
  findAll() {
    return this.userRepository.findAll();
  }
  async findById(id: string) {
    try {
      const { permissions, ...user } = await this.userRepository.findById(id);
      if (!user) throw new Error('User not found');
      if (!permissions) return user;
      const userPermissions = permissions.map((item: any) => `${item.entity}:${item.action}`);
      return { ...user, permissions: [...new Set(userPermissions)] };
    } catch (error) {
      console.log(error);
    }
  }
  async findByEmail(email: string) {
    try {
      const { permissions, preference, ...user } = await this.userRepository.findByEmail(email);
      if (!user) throw new Error('User not found');
      if (!permissions) return user;
      const userPermissions = permissions.map((item: any) => `${item.entity}:${item.action}`);
      const { main_tenant } = preference;
      return { ...user, main_tenant, permissions: [...new Set(userPermissions)] };
    } catch (error) {
      console.log(error);
    }
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user` + updateUserDto;
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
