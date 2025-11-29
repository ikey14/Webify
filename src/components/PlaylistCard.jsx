'use-client'

import { useState } from 'react';
import { useEffect } from 'react';

export default function PlaylistCard({id, name, imgSrc, selectPlaylist})
{
    return(<div className = "row-auto">
        <img src = {imgSrc}></img>
        <h1>{name}</h1>
        <button onClick = {() => selectPlaylist(id)} classname = "border-2 hover:cursor-pointer"></button>
    </div>)
}