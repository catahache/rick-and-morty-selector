import React from 'react';
import { RickAndMortyApp } from './components/RickAndMortyApp';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-body">
      <h1 className="text-2xl md:text-5xl font-title text-center py-4 md:py-6 text-[rgb(255,25,243)] font-bold px-2">
        Rick and Morty Character Selector
      </h1>
      <div className="flex-1 overflow-auto">
        <RickAndMortyApp />
      </div>
    </main>
  );
}