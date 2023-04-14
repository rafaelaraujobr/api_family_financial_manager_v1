import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { QueryCategoryDto } from './dto/query-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  findAll(query: QueryCategoryDto) {
    if (query.type === 'TREE') return this.categoryRepository.findTree();
    return this.categoryRepository.findAll(query);
  }
}
