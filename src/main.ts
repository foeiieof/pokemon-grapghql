import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/graphiql', express.static(path.join(__dirname, 'public')));
  await app.listen(PORT);
  console.log(`App running on: ${await app.getUrl()}`);
}

bootstrap();
