import { Module } from '@nestjs/common';
import { PokemonsResolver } from './pokemons.resolver';
import { HttpModule } from '@nestjs/axios';
import { PokemonAPIService } from 'src/infrastructure/api/pokemon-api.service';
import { PokemonAPIRepository } from 'src/infrastructure/repositories/pokemon.repository.impl';
import { PokemonsService } from 'src/application/services/pokemons.service';

@Module({
  imports: [HttpModule],
  providers: [
    PokemonsResolver,
    PokemonsService,
    PokemonAPIRepository,
    PokemonAPIService,
  ],
  exports: [PokemonsService]
})
export class PokemonsModule { }
