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

export const getStatusColor = (status: CharacterStatus): string => {
  switch (status) {
    case CharacterStatus.Alive:
      return 'bg-green-500';
    case CharacterStatus.Dead:
      return 'bg-red-500';
    case CharacterStatus.Unknown:
    default:
      return 'bg-gray-500';
  }
};
  