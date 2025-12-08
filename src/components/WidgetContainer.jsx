'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArtistWidget from './Widgets/ArtistWidget';
import TrackWidget from './Widgets/TrackWidget';
import GenreWidget from './Widgets/GenreWidget';

export default function WidgetContainer({ tracks, setTracks, preferences, setPreferences })
{
    
    // grid gap-1 sm:grid-cols-1 lg:grid-cols-2 border-2 rounded-xl min-h-svh max-w-full w-full mb-auto ml-2 mr-1.5
    // grid gap-1 sm:grid-cols-1 lg:grid-cols-2 border-2 rounded-xl min-h-svh w-full overflow-hidden
    return(<div className = "grid gap-1 sm:grid-cols-1 lg:grid-cols-3 border-2 rounded-xl h-full w-full overflow-hidden">
        <ArtistWidget preferences = {preferences} setPreferences = {setPreferences} />
        <TrackWidget preferences = {preferences} setPreferences = {setPreferences} />
        <GenreWidget preferences = {preferences} setPreferences = {setPreferences} />
    </div>)
}