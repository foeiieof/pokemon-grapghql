import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowHeaders: ['Content-Type']
  })
  await app.listen(PORT ?? 3000);
  console.log(`App run on : ${await app.getUrl()}  `)

}
bootstrap();
