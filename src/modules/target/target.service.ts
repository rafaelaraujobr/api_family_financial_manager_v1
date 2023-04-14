import { Injectable } from '@nestjs/common';
import { CreateTargetDto } from './dto/create-target.dto';
import { UpdateTargetDto } from './dto/update-target.dto';
import { TargetRepository } from './target.repository';

@Injectable()
export class TargetService {
  constructor(private readonly targetRepository: TargetRepository) {}
  create(createTargetDto: CreateTargetDto) {
    return this.targetRepository.create(createTargetDto);
  }

  findAll(query: any) {
    if (query.paginator) return this.targetRepository.findAllPaginator(query);
    else return this.targetRepository.findAll(query);
  }

  findById(id: string) {
    return `This action returns a #${id} target`;
  }

  update(id: string, updateTargetDto: UpdateTargetDto) {
    return `This action updates a #${id} target` + updateTargetDto;
  }

  remove(id: string) {
    return `This action removes a #${id} target`;
  }
}
