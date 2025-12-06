'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArtistWidget from './Widgets/ArtistWidget';
import TrackWidget from './Widgets/TrackWidget';

export default function WidgetContainer({ tracks, setTracks, preferences, setPreferences })
{
    return(<div className = "flex flex-1 flex-row border-2 rounded-2xl min-h-screen min-w-1/2 w-full max-w-2/3 mb-auto ml-2 mr-1.5">
        <ArtistWidget preferences = {preferences} setPreferences = {setPreferences} />
        <TrackWidget preferences = {preferences} setPreferences = {setPreferences} />
    </div>)
}