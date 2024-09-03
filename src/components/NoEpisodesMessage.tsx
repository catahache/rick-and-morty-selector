import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Frown } from 'lucide-react';

interface NoEpisodesMessageProps {
  isCommonList: boolean;
  instruction?: string;
}

export function NoEpisodesMessage({ isCommonList, instruction }: NoEpisodesMessageProps) {
  return (
    <Card className="flex items-center p-4 bg-white h-full">
      <Frown className="w-12 h-12 text-gray-400 mr-4 flex-shrink-0" />
      <div>
        <CardTitle className="text-lg mb-1">Oops!</CardTitle>
        <CardContent className="text-sm text-gray-600 p-0">
          {isCommonList
            ? "This characters doesn't share any episode :( Do you imagine what type of episode could they share in the future? Let us know!"
            : instruction || "No episodes to display."}
        </CardContent>
      </div>
    </Card>
  );
}