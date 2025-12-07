'use-client'

import { useState } from 'react';
import { useEffect } from 'react';

export default function TrackCard({id, name, imgSrc, artist, removeTrack, favTrack})
{
    useEffect(() => {
        console.log(imgSrc);
        // setHasPlaylist(1);
    }, []);

    return(<div className = "flex">
        {imgSrc != undefined && <div className = "m-3 max-h-20 max-w-20 p-1 rounded-xl bg-linear-to-r from-red-500 via-yellow-500 to-blue-500">
            <img 
                src = {imgSrc} 
                className = "rounded-xl"
            />
        </div>}

        {imgSrc == undefined && <div className = "m-3 max-h-20 max-w-20 p-0.5 rounded-xl bg-linear-to-r from-red-500 via-yellow-500 to-blue-500">
            <img 
                src = "noPlaylistImage.jpg"
                className = "rounded-xl"
            />
        </div>}

        <div className = "flex flex-1 justify-between">
            <div className = "flex flex-col justify-center items-start">
                <h1 className = "m-1">{name}</h1>
                <p className = "m-1 text-gray-600">{artist}</p>
            </div>

            <div className = "flex justify-center items-center">
                <button 
                    onClick = {() => favTrack(id)} 
                    className = "border-2 rounded-xl p-1 m-1 hover:cursor-pointer hover:bg-linear-to-br from-pink-500/25 via-pink-500/50 to-pink-500"
                >
                ❤️
                </button>

                <button 
                    onClick = {() => removeTrack(id)} 
                    className = "border-2 rounded-xl p-1 m-1 hover:cursor-pointer hover:bg-linear-to-br from-white/0 via-black/0 to-red-600"
                >
                ❌
                </button>
            </div>
        </div>
    </div>)
}