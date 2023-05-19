import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/categories')
@ApiTags('api/categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    getCategories(){
        try {
            return this.categoryService.getCategories();
        } catch (err) {
            console.log(err)
        }
    }

    @UseGuards(JwtGuard)
    @Post()
    postCategory(@Body() dto: CategoryDto) {
        try {
            return this.categoryService.postCategory(dto);   
        } catch (err) {
            console.log(err)
        }
    }

    @Get(":id")
    getCategory(@Param() params: any){
        try {
            return this.categoryService.getCategory(params.id);
        } catch (err) {
            console.log(err)
        }
    }
    
    @UseGuards(JwtGuard)
    @Delete(":id")
    deleteCategory(@Param() params: any){
        try {
            return this.categoryService.deleteCategory(params.id);
        } catch (err) {
            console.log(err)
        }
    }

}
