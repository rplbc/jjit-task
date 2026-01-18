export interface PokemonSummary {
  id: number;
  name: string;
}

export interface PokemonDetails extends PokemonSummary {
  base_experience: number;
  img: string | null;
  types: string[];
}

export interface Trainer {
  name: string;
  age: number;
  pokemon: PokemonSummary['name'];
}
