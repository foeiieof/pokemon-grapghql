import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { PokemonsService } from 'src/application/services/pokemons.service';
import { Pokemon } from 'src/domain/entities/pokemon.entity';

@Resolver(() => Pokemon)
export class PokemonsResolver {
  constructor(
    private readonly _service: PokemonsService) { }

  @Query(() => [Pokemon], { name: 'pokemons' })
  async findAll(@Args('first', { type: () => Number }) first: number) {
    return await this._service.getAll(first);
  }

  @Query(() => Pokemon, { name: 'pokemon' })
  async findOne(
    @Args('id', { type: () => String, nullable: true }) id?: string,
    @Args('name', { type: () => String, nullable: true }) name?: string) {
    if (!id && !name) throw new Error(`Please fill some 'id' or 'name'`)
    const r = await this._service.getOne({ id, name });
    console.log('Resolver service:::::', r)
    return r
  }

}
