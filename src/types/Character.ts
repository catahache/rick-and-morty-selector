export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  episode: string[];
}

export enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'Unknown'
}
  