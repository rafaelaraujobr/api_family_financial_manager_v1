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

  findById(id: string) {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user` + updateUserDto;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
