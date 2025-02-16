import { Pokemon } from "../entities/pokemon.entity";

export interface PokemonsRepository {
  getAll(first: number): Promise<Pokemon[]>;
  getOne({ id, name }: Partial<Record<'id' | 'name', string>>): Promise<Pokemon>;
}
