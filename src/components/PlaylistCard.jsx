'use-client'

import { useState } from 'react';
import { useEffect } from 'react';

export default function PlaylistCard({id, name, imgSrc, selectPlaylist})
{
    // useEffect(() => {
    //     console.log(imgSrc);
    //     // setHasPlaylist(1);
    // }, []);

    return(<div className = "flex lg:flex-row md:flex-col sm:flex-row items-center">
        {imgSrc != undefined && <img 
            onClick = {() => selectPlaylist(id)} 
            src = {imgSrc} 
            className = "border-4 border-white rounded-2xl m-3 max-h-20 max-w-20 hover:cursor-pointer"/>}

        {imgSrc == undefined && <img 
            onClick = {() => selectPlaylist(id)} 
            src = "noPlaylistImage.jpg" 
            className = "border-4 border-white rounded-2xl m-3 max-h-20 lg:max-w-20 hover:cursor-pointer"/>}
        
        <div className = "flex justify-center items-center">
            <h1 className = "p-2 md:text-xl lg:text-2xl text-2xl">{name}</h1>
        </div>
    </div>)
}