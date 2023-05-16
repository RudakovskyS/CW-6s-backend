import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { TopicModule } from './topic/topic.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { RateModule } from './rate/rate.module';
import { QuizModule } from './quiz/quiz.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UserModule, 
    PrismaModule, CategoryModule, TopicModule, PostModule, CommentModule, RateModule, QuizModule, DictionaryModule,
    ChatModule
  ],
  providers: [ChatGateway]
})
export class AppModule { }
