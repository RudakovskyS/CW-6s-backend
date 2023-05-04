import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { RateService } from 'src/rate/rate.service';

@Module({
  controllers: [PostController],
  providers: [PostService, RateService]
})
export class PostModule {}
