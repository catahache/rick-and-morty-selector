import React from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { Character } from '@/types/Character';
import { SelectableCharacterCard } from './SelectableCharacterCard';
import Pagination from './Pagination';

interface SelectableCharacterListProps {
  onSelect: (character: Character) => void;
  disabledCharacter: Character | null;
}

const SKELETON_COUNT = 6;
const skeletonArray = Array(SKELETON_COUNT).fill(null);

export default function SelectableCharacterList({ onSelect, disabledCharacter }: SelectableCharacterListProps) {
  const { characters, isLoading, page, setPage, totalPages, selectedCharacter, selectCharacter } = useCharacters(1, disabledCharacter);

  const handleSelect = (character: Character) => {
    if (character.id === disabledCharacter?.id) return;
    selectCharacter(character);
    onSelect(character);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 p-2">
          {isLoading
            ? skeletonArray.map((_, index) => <SelectableCharacterCard key={`skeleton-${index}`} isSkeleton />)
            : characters.map(character => (
                <SelectableCharacterCard
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacter?.id === character.id}
                  isDisabled={character.id === disabledCharacter?.id}
                  onSelect={handleSelect}
                />
              ))
          }
        </div>
      </div>
      <div className="flex justify-center md:justify-end mt-4 p-2">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}