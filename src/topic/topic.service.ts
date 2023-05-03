import { Injectable } from '@nestjs/common';
import { TopicDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopicService {
    constructor(private prisma: PrismaService) { }

    async getTopics() {
        return await this.prisma.topic.findMany();
    }

    async getCategoryTopics(id: number) {
        return await this.prisma.topic.findMany({
            where: {
                categoryCategory_id: +id
            },
            include: {
                category: true
            }
        })
    }
    async postTopic(id: number, dto: TopicDto) {
        const topic = await this.prisma.topic.create({
            data: {
                name: dto.name,
                categoryCategory_id: +id
            }
        })
        return topic;
    }

    async getTopic(id: number) {
        return await this.prisma.topic.findUnique({
            where: {
                topic_id: +id
            },
            include: {
                category: true
            }
        })
    }
    async deleteTopic(id: number) {
        return await this.prisma.topic.delete({
            where: {
                topic_id: +id
            },
            include: {
                category: true
            }
        })
    }
}
