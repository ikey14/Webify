'use-client'

import { useState } from 'react';
import { useEffect } from 'react';

export default function PlaylistCard({id, name, imgSrc, selectPlaylist, setHasPlaylist})
{
    useEffect(() => {
        console.log(imgSrc);
        // setHasPlaylist(1);
    }, []);

    return(<div className = "row-auto flex">
        {imgSrc != undefined && <img src = {imgSrc} className = "p-2"></img>}
        {imgSrc == undefined && <img src = "noPlaylistImage.jpg" className = "p-2 max-h-20 max-w-20"></img>}
        <h1 className = "p-2">{name}</h1>
        <button onClick = {() => {selectPlaylist(id); setHasPlaylist(true)}} className = "border-2 hover:cursor-pointer pl-1 pr-1 max-h-10">Select</button>
    </div>)
}