import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Episode } from '@/types/Episode';
import { Frown } from 'lucide-react';
import { EpisodeCard } from './EpisodeCard';

const SKELETON_COUNT = 3;
const skeletonArray = Array(SKELETON_COUNT).fill(null);

interface EpisodeListProps {
  episodes: Episode[];
  title: string;
  instruction?: string;
  isCommonList?: boolean;
  isLoading: boolean;
  titleClassName?: string;
}

export function EpisodeList({ 
  episodes, 
  title, 
  instruction, 
  isCommonList = false, 
  isLoading,
  titleClassName
}: EpisodeListProps) {
  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden">
      <h3 className={`text-xl mb-2 ${titleClassName}`}>{title}</h3>
      <div className="flex-1 overflow-auto p-2">
        {isLoading ? (
          <div className="space-y-2">
            {skeletonArray.map((_, index) => (
              <EpisodeCard key={`skeleton-${index}`} isSkeleton />
            ))}
          </div>
        ) : episodes.length > 0 ? (
          <div className="space-y-2">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          <Card className="flex items-center p-4 bg-white h-full">
            <Frown className="w-12 h-12 text-gray-400 mr-4 flex-shrink-0" />
            <div>
              <CardTitle className="text-lg mb-1">Ups!</CardTitle>
              <CardContent className="text-sm text-gray-600 p-0">
                {isCommonList
                  ? "Estos personajes no comparten ningún episodio :("
                  : instruction || "No episodes to display."}
              </CardContent>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}