import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Character, CharacterStatus, getStatusColor } from '@/types/Character';

interface SelectableCharacterCardProps {
    character?: Character;
    isSelected?: boolean;
    isDisabled?: boolean;
    onSelect?: (character: Character) => void;
    isSkeleton?: boolean;
  }
  
  export function SelectableCharacterCard({
    character,
    isSelected = false,
    isDisabled = false,
    onSelect,
    isSkeleton = false
  }: SelectableCharacterCardProps) {
    if (isSkeleton) {
      return (
        <Card className="flex overflow-hidden mb-2 md:mb-4 h-20 md:h-24">
          <Skeleton className="w-20 md:w-24 h-20 md:h-24" />
          <div className="flex-1 p-2">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </Card>
      );
    }

    if (!character) return null;

    return (
      <Card
        className={`
          character-card flex overflow-hidden cursor-pointer relative h-20 md:h-24
          ${isSelected ? "selected ring-2 ring-[rgb(25,255,45)]" : ""}
          ${
            isDisabled
              ? "disabled bg-gray-100 cursor-not-allowed"
              : "hover:shadow-lg"
          }
        `}
        onClick={() => !isDisabled && onSelect && onSelect(character)}
      >
        <div className="w-20 md:w-24 h-20 md:h-24 relative flex-shrink-0">
          <Image
            src={character.image}
            alt={character.name}
            layout="fill"
            objectFit="cover"
            className={isDisabled ? "filter blur-sm" : ""}
          />
        </div>
        <CardContent className="flex-1 p-2 flex flex-col justify-center overflow-hidden">
          <h3
            className={`truncate text-xs sm:text-sm font-semibold ${
              isDisabled ? "text-gray-500" : ""
            }`}
            title={character.name}
          >
            {character.name}
          </h3>
          <div className="flex items-center mt-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                      character.status as CharacterStatus
                    )}`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{character.status}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p
              className={`text-xs truncate ${
                isDisabled ? "text-gray-400" : ""
              }`}
            >
              {character.status} - {character.species}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }