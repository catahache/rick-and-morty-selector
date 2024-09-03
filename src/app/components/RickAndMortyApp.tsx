"use client";

import React, { useState } from 'react';
import SelectableCharacterList from './SelectableCharacterList';
import { EpisodeList } from './EpisodeList';
import { useCharacterEpisodes } from '@/hooks/useCharacterEpisodes';
import { Character } from '@/types/Character';

export function RickAndMortyApp() {
  const [selectedCharacter1, setSelectedCharacter1] = useState<Character | null>(null);
  const [selectedCharacter2, setSelectedCharacter2] = useState<Character | null>(null);

  const { 
    episodes1, 
    episodes2, 
    commonEpisodes, 
    isLoading1, 
    isLoading2, 
    isLoadingCommon,
    updateCharacter1,
    updateCharacter2
  } = useCharacterEpisodes();

  const getListTitle = (characterNumber: number, character: Character | null) => {
    return (
      <h2 className="text-lg md:text-2xl font-title mb-2 truncate">
        Character #{characterNumber}
        {character && (
          <>
            :{' '}
            <span className="bg-[rgb(255,25,243)]/30 px-2 py-1 rounded">
              {character.name}
            </span>
          </>
        )}
      </h2>
    );
  };

  return (
    <main className=" flex flex-col overflow-hidden font-body">
      <h1 className="text-3xl md:text-5xl font-title text-center py-4 md:py-6 text-[rgb(255,25,243)] font-bold px-2">
        Rick and Morty Character Selector
      </h1>
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        <div className="w-full md:w-1/2 p-2 md:p-4 flex flex-col min-h-0">
          {getListTitle(1, selectedCharacter1)}
          <div className="flex-1 overflow-hidden">
            <SelectableCharacterList 
              onSelect={(character) => {
                setSelectedCharacter1(character);
                updateCharacter1(character);
              }} 
              disabledCharacter={selectedCharacter2}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2 md:p-4 flex flex-col min-h-0">
          {getListTitle(2, selectedCharacter2)}
          <div className="flex-1 overflow-hidden">
            <SelectableCharacterList 
              onSelect={(character) => {
                setSelectedCharacter2(character);
                updateCharacter2(character);
              }} 
              disabledCharacter={selectedCharacter1}
            />
          </div>
        </div>
      </div>
      <div className="h-1/3 flex flex-col md:flex-row overflow-hidden bg-[rgb(255,25,243)]/30">
        <EpisodeList 
          episodes={episodes1} 
          title={`Episodes for ${selectedCharacter1?.name || 'Character #1'}`}
          instruction="Select a character from List 1 to see their episodes."
          isLoading={isLoading1}
          titleClassName="font-title"
        />
        <EpisodeList 
          episodes={commonEpisodes} 
          title="Common Episodes"
          instruction="Select characters from both lists to see their common episodes."
          isCommonList={true}
          isLoading={isLoadingCommon}
          titleClassName="font-title"
        />
        <EpisodeList 
          episodes={episodes2} 
          title={`Episodes for ${selectedCharacter2?.name || 'Character #2'}`}
          instruction="Select a character from List 2 to see their episodes."
          isLoading={isLoading2}
          titleClassName="font-title"
        />
      </div>
    </main>
  );
}