import { useState, useEffect, useCallback } from 'react';
import { getCharacterEpisodes, getCommonEpisodes } from '@/services/rickAndMortyApi';
import { Character } from '@/types/Character';
import { Episode } from '@/types/Episode';

const MIN_LOADING_TIME = 300;

export function useCharacterEpisodes() {
    const [episodes1, setEpisodes1] = useState<Episode[]>([]);
    const [episodes2, setEpisodes2] = useState<Episode[]>([]);
    const [commonEpisodes, setCommonEpisodes] = useState<Episode[]>([]);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoadingCommon, setIsLoadingCommon] = useState(false);
    const [character1, setCharacter1] = useState<Character | null>(null);
    const [character2, setCharacter2] = useState<Character | null>(null);
  
    const fetchEpisodesWithMinLoading = useCallback(async (
      fetchFunction: () => Promise<Episode[]>,
      setEpisodes: React.Dispatch<React.SetStateAction<Episode[]>>,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const episodes = await fetchFunction();
        setEpisodes(episodes);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < MIN_LOADING_TIME) {
          await new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
        }
        setIsLoading(false);
      }
    }, []);
  
    const updateCharacter1 = useCallback((newCharacter: Character | null) => {
      setCharacter1(newCharacter);
      if (newCharacter) {
        fetchEpisodesWithMinLoading(
          () => getCharacterEpisodes(newCharacter.id),
          setEpisodes1,
          setIsLoading1
        );
      } else {
        setEpisodes1([]);
      }
    }, [fetchEpisodesWithMinLoading]);
  
    const updateCharacter2 = useCallback((newCharacter: Character | null) => {
      setCharacter2(newCharacter);
      if (newCharacter) {
        fetchEpisodesWithMinLoading(
          () => getCharacterEpisodes(newCharacter.id),
          setEpisodes2,
          setIsLoading2
        );
      } else {
        setEpisodes2([]);
      }
    }, [fetchEpisodesWithMinLoading]);
  
    useEffect(() => {
      if (character1 && character2) {
        fetchEpisodesWithMinLoading(
          () => getCommonEpisodes(character1.id, character2.id),
          setCommonEpisodes,
          setIsLoadingCommon
        );
      } else {
        setCommonEpisodes([]);
      }
    }, [character1, character2, fetchEpisodesWithMinLoading]);
  
    return { 
      episodes1, 
      episodes2, 
      commonEpisodes, 
      isLoading1, 
      isLoading2, 
      isLoadingCommon,
      updateCharacter1,
      updateCharacter2
    };
  }