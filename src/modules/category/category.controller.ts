import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryCategoryDto } from './dto/query-category.dto';
import { CategoryEntity } from './entities/category.entity';
// import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Categories')
@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiResponse({ status: 200, description: 'Sucesso', isArray: true, type: CategoryEntity })
  // @ApiBearerAuth('JWT')
  // @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() query: QueryCategoryDto) {
    return this.categoryService.findAll(query);
  }
}
