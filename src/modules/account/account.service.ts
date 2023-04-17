import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserRepository } from '../user/user.repository';
import { hash } from 'bcrypt';
import { AccountRepository } from './account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly userRepository: UserRepository, private readonly accountRepository: AccountRepository) {}
  async create(createAccountDto: CreateAccountDto) {
    const isUserExit = await this.userRepository.findByEmail(createAccountDto.email);
    if (isUserExit) throw new NotFoundException('User already exists');
    const hashedPassword = await hash(createAccountDto.password, 10);
    const user = await this.accountRepository.create({
      ...createAccountDto,
      password: hashedPassword,
    });
    if (!user) throw new NotFoundException('User not found');
    return { message: 'User created successfully' };
  }
  async getProfile(id: string) {
    return await this.userRepository.findById(id);
  }
}
