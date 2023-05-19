import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    cert: fs.readFileSync('CA.crt'),
    key: fs.readFileSync('CA.key'),
    passphrase: 'pass',
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.useGlobalPipes(new ValidationPipe(
    {whitelist: true}
  ));
  
  app.enableCors();
  const options = new DocumentBuilder()
  .setTitle('Спадарожнік API')
  .setDescription('API for course priject')
  .setVersion('0.0.1')
  .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
