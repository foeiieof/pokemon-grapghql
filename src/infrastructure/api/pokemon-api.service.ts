import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import { firstValueFrom } from "rxjs";
import { Pokemon } from "src/domain/entities/pokemon.entity";
import { PokemonsRepository } from "src/domain/repositories/pokemons.repository";

@Injectable()
export class PokemonAPIService implements PokemonsRepository {
  private _: string = process.env.API_BASE || "";
  private _h: AxiosRequestConfig = { headers: { "Content-Type": "application/json" } }
  private _body = ({ first, id, name }: { first?: number, id?: string, name?: string }) => {
    return {
      query: `
        query ${first ? `GetPokemons($first: Int!)` : id ? `GetPokemon($id: String)` : `GetPokemon($name: String)`}{
          ${first ? `pokemons(first: $first)` : id ? `pokemon(id: $id)` : `pokemon(name: $name)`}{
            id
            number
            name
            weight{
              minimum
              maximum
            }
            height{
              minimum
              maximum
            }
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            maxHP
            image
            attacks{
              fast{
                name
                type
                damage
              }
              special {
                name
                type
                damage
              }
            }
          evolutions{
            id
            number
            name
            weight{
              minimum
              maximum
            }
            height{
              minimum
              maximum
            }
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            maxHP
            image
            }
          }
        }
      `,
      variables: {
        first, id, name
      },
    };
  }
  constructor(private readonly _http: HttpService) { }

  async getAll(first: number): Promise<Pokemon[]> {
    try {
      const res = await firstValueFrom(this._http.post(this._, this._body({ first }), this._h));
      return res.data?.data?.pokemons || [];
    }
    catch (e) { throw new Error(e); }
  }

  async getOne({ id, name }: Partial<Record<'id' | 'name', string>>): Promise<Pokemon> {
    console.log('Api.service')
    const body = id ? this._body({ id }) : name ? this._body({ name }) : null;
    // console.log("body=======>", body)
    if (!body) throw new Error("Require 'id' or 'name'");
    const res = await firstValueFrom(this._http.post(this._, body, this._h));
    // console.log("Pokemons API response:", res.data.data?.pokemon.attacks);
    return res.data?.data?.pokemon;
  }
}
