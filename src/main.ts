import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { buildSchema } from 'graphql';
const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/graphql', express.static(path.join(__dirname, 'public')));

  app.use('/graphiql', express.static(path.join(__dirname, 'public')));

  app.use('/graphql', express.json(), (req, res, next) => {
    const graphql = require('express-graphql');
    const schema = buildSchema('schema.gql'); return graphql({
      schema,
      graphiql: true,
    })(req, res, next);
  });

  await app.listen(PORT);
  console.log(`App running on: ${await app.getUrl()}`);
}

bootstrap();
