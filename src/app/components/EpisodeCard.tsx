import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Episode } from '@/types/Episode';

interface EpisodeCardProps {
  episode?: Episode;
  isSkeleton?: boolean;
}

export function EpisodeCard({ episode, isSkeleton = false }: EpisodeCardProps) {
  if (isSkeleton) {
    return (
      <Card className="mb-2">
        <CardContent className="p-2">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2 mb-1" />
          <Skeleton className="h-3 w-1/3" />
        </CardContent>
      </Card>
    );
  }

  if (!episode) {
    return null;
  }

  return (
    <Card className="mb-2">
      <CardHeader className="p-2">
        <CardTitle className="text-sm">{episode.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <p className="text-xs">{episode.episode}</p>
        <p className="text-xs">{episode.air_date}</p>
      </CardContent>
    </Card>
  );
}