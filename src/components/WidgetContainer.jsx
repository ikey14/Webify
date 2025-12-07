'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArtistWidget from './Widgets/ArtistWidget';
import TrackWidget from './Widgets/TrackWidget';

export default function WidgetContainer({ tracks, setTracks, preferences, setPreferences })
{
    // flex flex-1 lg:flex-row flex-col border-2 rounded-2xl min-h-screen min-w-1/2 w-full max-w-2/3 mb-auto ml-2 mr-1.5
    // grid sm:grid-cols-1 lg:grid-cols-2 grid-cols-3 border-2 rounded-2xl min-h-screen min-w-1/2 w-full max-w-2/3 mb-auto ml-2 mr-1.5
    return(<div className = "grid gap-1 sm:grid-cols-1 lg:grid-cols-2 border-2 rounded-xl min-h-svh w-full mb-auto ml-2 mr-1.5">
        <ArtistWidget preferences = {preferences} setPreferences = {setPreferences} />
        <TrackWidget preferences = {preferences} setPreferences = {setPreferences} />
    </div>)
}