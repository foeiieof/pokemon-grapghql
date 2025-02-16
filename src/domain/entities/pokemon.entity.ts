import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Attack {
  @Field()
  name: string

  @Field()
  type: string

  @Field()
  damage: number
}

@ObjectType()
export class PokemonEvolutionRequirement {
  @Field()
  amount: number

  @Field()
  name: string
}

@ObjectType()
export class PokemonAttack {
  @Field(() => [Attack], { nullable: true })
  fast: Attack[]

  @Field(() => [Attack], { nullable: true })
  special: Attack[]
}

@ObjectType()
export class PokemonDimension {
  @Field()
  minimum: string

  @Field()
  maximum: string
}

@ObjectType()
export class Pokemon {

  @Field()
  id: string;

  @Field()
  number: string;

  @Field()
  name: string

  @Field()
  weight: PokemonDimension

  @Field()
  height: PokemonDimension

  @Field()
  classification: string

  @Field(() => [String], { nullable: true })
  types: string[]

  @Field(() => [String], { nullable: true })
  resistant: string[]

  @Field()
  attacks: PokemonAttack

  @Field(() => [String], { nullable: true })
  weaknesses: string[]

  @Field()
  fleeRate: number

  @Field()
  maxCP: number

  @Field(() => [Pokemon], { nullable: true })
  evolutions: Pokemon[]

  @Field()
  evolutionRequirements: PokemonEvolutionRequirement

  @Field()
  maxHP: number

  @Field()
  image: string

}


