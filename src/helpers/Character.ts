import { CharacterStatus } from "@/types/Character";

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