'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArtistWidget from './Widgets/ArtistWidget';

export default function WidgetContainer({ tracks, setTracks })
{
    return(<div className = "flex flex-1 flex-col border-2 rounded-2xl min-h-screen min-w-1/2 w-full max-w-2/3 mb-auto ml-2 mr-1.5">
        {/* Grid display with all the widgets */}
        {/* <h1 className = "p-2">Currently Empty.</h1> */}
        <ArtistWidget />
    </div>)
}