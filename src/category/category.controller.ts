import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@UseGuards(JwtGuard)
@Controller('api/categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {

    }

    @Get()
    getCategories(){
        return this.categoryService.getCategories();
    }

    @Post()
    postCategory(@Body() dto: CategoryDto) {
        return this.categoryService.postCategory(dto);
    }

    @Get(":id")
    getCategory(@Param() params: any){
        return this.categoryService.getCategory(params.id);
    }
    
    @Delete(":id")
    deleteCategory(@Param() params: any){
        return this.categoryService.deleteCategory(params.id);
    }

}
