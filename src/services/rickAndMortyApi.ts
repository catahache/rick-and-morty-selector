import { ApiResponse } from '@/types/ApiResponse';
import { fetchApi } from './apiClient';
import { Character } from '@/types/Character';
import { Episode } from '@/types/Episode';

export async function getCharacters(page: number): Promise<ApiResponse<Character>> {
  return await fetchApi<ApiResponse<Character>>('/character', { page: page.toString() });
}

export async function getCharacterEpisodes(characterId: number): Promise<Episode[]> {
  const character = await fetchApi<Character>(`/character/${characterId}`);
  const episodeUrls = character.episode;
  
  const episodeIds = episodeUrls.map(url => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  });

  if (episodeIds.length === 1) {
    const episode = await fetchApi<Episode>(`/episode/${episodeIds[0]}`);
    return [episode];
  } else {
    return await fetchApi<Episode[]>(`/episode/${episodeIds.join(',')}`);
  }
}

export async function getCommonEpisodes(characterId1: number, characterId2: number): Promise<Episode[]> {
  const episodes1 = await getCharacterEpisodes(characterId1);
  const episodes2 = await getCharacterEpisodes(characterId2);
  
  const episodeSet1 = new Set(episodes1.map(ep => ep.id));
  return episodes2.filter(ep => episodeSet1.has(ep.id));
}