'use-client'

import { useState } from 'react';
import { useEffect } from 'react';

export default function PlaylistCard({id, name, imgSrc, selectPlaylist})
{
    useEffect(() => {
        console.log(imgSrc);
        // setHasPlaylist(1);
    }, []);

    return(<div className = "flex">
        {imgSrc != undefined && <img 
            onClick = {() => selectPlaylist(id)} 
            src = {imgSrc} 
            className = "border-4 border-white rounded-2xl m-3 max-h-20 max-w-20 hover:cursor-pointer"/>}

        {imgSrc == undefined && <img 
            onClick = {() => selectPlaylist(id)} 
            src = "noPlaylistImage.jpg" 
            className = "border-4 border-white rounded-2xl m-3 max-h-20 max-w-20 hover:cursor-pointer"/>}
        
        <div className = "flex justify-center items-center">
            <h1 className = "p-2">{name}</h1>
        </div>
        {/* <button onClick = {() => selectPlaylist(id)} className = "border-2 rounded-2xl hover:cursor-pointer pl-1 pr-1 max-h-10">Select</button> */}
    </div>)
}