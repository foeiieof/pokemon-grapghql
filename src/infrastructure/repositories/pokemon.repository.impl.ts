import { Injectable } from "@nestjs/common";
import { Pokemon } from "src/domain/entities/pokemon.entity";
import { PokemonsRepository } from "src/domain/repositories/pokemons.repository";
import { PokemonAPIService } from "../api/pokemon-api.service";

@Injectable()
export class PokemonAPIRepository implements PokemonsRepository {

  constructor(private readonly _apiService: PokemonAPIService) { }

  async getAll(first: number): Promise<Pokemon[]> {
    const pokemons = await this._apiService.getAll(first);
    return pokemons
  }

  async getOne({ id, name }: Partial<Record<'id' | 'name', string>>): Promise<Pokemon> {
    console.log('repo.impl')
    const pokemon = await this._apiService.getOne({ id, name });
    // console.log("pokemon repo impl:::: ", pokemon)
    return pokemon
  }
}
