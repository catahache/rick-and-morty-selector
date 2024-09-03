import { NextRequest, NextResponse } from 'next/server';
import { getCharacters, getCharacterEpisodes, getCommonEpisodes } from '../../services/rickAndMortyApi';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'characters':
        const page = searchParams.get('page');
        const characters = await getCharacters(Number(page) || 1);
        return NextResponse.json(characters);

      case 'characterEpisodes':
        const characterId = searchParams.get('id');
        if (!characterId) {
          return NextResponse.json({ error: 'Character ID is required' }, { status: 400 });
        }
        const episodes = await getCharacterEpisodes(Number(characterId));
        return NextResponse.json(episodes);

      case 'commonEpisodes':
        const id1 = searchParams.get('id1');
        const id2 = searchParams.get('id2');
        if (!id1 || !id2) {
          return NextResponse.json({ error: 'Both character IDs are required' }, { status: 400 });
        }
        const commonEpisodes = await getCommonEpisodes(Number(id1), Number(id2));
        return NextResponse.json(commonEpisodes);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}