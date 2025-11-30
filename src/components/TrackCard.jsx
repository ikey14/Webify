'use-client'

import { useState } from 'react';
import { useEffect } from 'react';

export default function TrackCard({id, name, imgSrc})
{
    useEffect(() => {
        console.log(imgSrc);
        // setHasPlaylist(1);
    }, []);

    return(<div className = "flex">
        {imgSrc != undefined && <img src = {imgSrc} className = "border-2 border-red-600 rounded-2xl m-3 max-h-20 max-w-20"></img>}
        {imgSrc == undefined && <img src = "noPlaylistImage.jpg" className = "border-2 border-red-600 rounded-2xl m-3 max-h-20 max-w-20"></img>}
        <div className = "flex justify-center items-center">
            <h1 className = "p-2">{name}</h1>
        </div>
        {/* <button onClick = {() => selectPlaylist(id)} className = "border-2 hover:cursor-pointer pl-1 pr-1 max-h-10">Select</button> */}
    </div>)
}