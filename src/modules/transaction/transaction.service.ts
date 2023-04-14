import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { income, expense } = await this.transactionRepository.findWalletBalanceById(createTransactionDto.wallet_id);
    if (createTransactionDto.type === 'EXPENSE' && expense + createTransactionDto.amount > income)
      throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
    await this.transactionRepository.create(createTransactionDto);
    return { message: 'Transaction created successfully' };
  }

  findAll() {
    return this.transactionRepository.findAll();
  }

  findById(id: string) {
    return `This action returns a #${id} transaction`;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction` + updateTransactionDto;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
