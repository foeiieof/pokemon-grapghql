import { Injectable } from '@nestjs/common';
import { Pokemon } from 'src/domain/entities/pokemon.entity';
import { PokemonAPIRepository } from 'src/infrastructure/repositories/pokemon.repository.impl';

@Injectable()
export class PokemonsService {
  constructor(private readonly pokemonReposity: PokemonAPIRepository) { }

  async getAll(first: number): Promise<Pokemon[]> {
    return await this.pokemonReposity.getAll(first)
  }

  async getOne({ id, name }: Partial<Record<'id' | 'name', string>>): Promise<Pokemon> {
    const r = await this.pokemonReposity.getOne({ id, name })
    console.log('Service :::::', r)
    return r
  }
}
