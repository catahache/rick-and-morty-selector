import { useState, useEffect } from 'react';
import { getCharacters } from '@/services/rickAndMortyApi';
import { Character } from '@/types/Character';

export function useCharacters(initialPage: number = 1, disabledCharacter: Character | null) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const data = await getCharacters(page);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error('Error in useCharacters hook:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const selectCharacter = (character: Character) => {
    if (disabledCharacter && character.id === disabledCharacter.id) return;
    setSelectedCharacter(character);
  };

  return { 
    characters,
    isLoading,
    page,
    setPage,
    totalPages,
    selectedCharacter,
    selectCharacter
  };
}