import { ForbiddenException, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {

    }

    async getCategories() {
        return await this.prisma.category.findMany({
            include: {
                topics: true
            }
        });
    }

    async postCategory(dto: CategoryDto) {
        try {
            const category = await this.prisma.category.create({
                data: {
                    name: dto.name
                }
            })
            return category;

        } catch (error) {
            throw new ForbiddenException("Something wrong with the data")
        }
    }

    async getCategory(id: number) {
        return await this.prisma.category.findFirst(
            {
                where: {
                    category_id: +id
                }
            }
        );
    }

    async deleteCategory(id: number) {
        return await this.prisma.category.delete(
            {
                where: {
                    category_id: +id
                }
            }
        );
    }
}
