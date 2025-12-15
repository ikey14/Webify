'use-client'

import { useState } from 'react';
import { useEffect } from 'react';

export default function TrackCard({id, name, imgSrc, artist, removeTrack, favTrack})
{
    // useEffect(() => {
    //     console.log(imgSrc);
    // }, []);
    function handleImageClick()
    {
        //blank = new tab
        //noopener so that the new tab can't affect the old one (noreferrer does something similar)
        window.open(`https://open.spotify.com/track/${id}`, '_blank', 'noopener,noreferrer');
    }

    return(<div className = "flex xl:flex-row md:flex-col flex-row items-center">
        {imgSrc != undefined && <div className = "m-3 max-h-22 max-w-22 p-1 rounded-xl bg-linear-to-r from-red-500 via-yellow-500 to-blue-500">
            <img 
                src = {imgSrc}
                onClick = {() => handleImageClick()}
                className = "rounded-xl max-h-20 max-w-20 hover:cursor-pointer hover:brightness-50 transition duration-150"
            />
        </div>}

        {imgSrc == undefined && <div className = "m-3 max-h-22 max-w-22 p-0.5 rounded-xl bg-linear-to-r from-red-500 via-yellow-500 to-blue-500">
            <img 
                src = "noPlaylistImage.jpg"
                onClick = {() => handleImageClick()}
                className = "rounded-xl max-h-20 max-w-20 hover:cursor-pointer hover:brightness-50 transition duration-150"
            />
        </div>}

        <div className = "flex xl:flex-row md:flex-col flex-row flex-1 justify-between">
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