import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PokemonsModule } from './interface/graphql/pokemons.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', playground: process.env.NODE_ENV === 'development',
      debug: true,
      path: '/graphql',
    }),
    PokemonsModule,
  ],
})
export class AppModule { }
