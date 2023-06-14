import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { hash } from 'bcrypt';
import { AccountRepository } from './account.repository';
import { UserService } from '../user/user.service';
import { UpdatePreferenceDto } from './dto/update-preference';

@Injectable()
export class AccountService {
  constructor(private readonly userService: UserService, private readonly accountRepository: AccountRepository) {}
  async create(createAccountDto: CreateAccountDto) {
    const isUserExit = await this.userService.findByEmail(createAccountDto.email);
    if (isUserExit) throw new BadRequestException('User already exists');
    const hashedPassword = await hash(createAccountDto.password, 10);
    const user = await this.accountRepository.create({
      ...createAccountDto,
      password: hashedPassword,
    });
    if (!user) throw new BadRequestException('User not found');
    return { message: 'User created successfully' };
  }
  async getProfile(id: string) {
    return await this.userService.findById(id);
  }

  updatePreference(user_id: string, updatePreferenceDto: UpdatePreferenceDto) {
    return this.accountRepository.updatePreference(user_id, updatePreferenceDto);
  }
}
