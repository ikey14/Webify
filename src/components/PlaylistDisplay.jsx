'use-client'

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserPlaylists } from '@/app/api/ApiCall'
import PlaylistCard from './PlaylistCard';

export default function PlaylistDisplay({ tracks, setTracks })
{
    let limit = 10;
    //0 if no playlist selected, 1 if there is a playlist selected
    const [hasPlaylist, setHasPlaylist] = useState(false);
    //Stores all of the user's playlist
    const [playlists, setPlayLists] = useState([]);
    //Stores current playlist's ID
    const [currPlayList, setCurrPlayList] = useState([]);

    async function loadPlaylists() 
    {
        const data = await getUserPlaylists(limit);
        // ensure an array
        setPlayLists(data.items || []);
    }

    useEffect(() => {
        loadPlaylists();
        console.log(playlists);
    }, []);

    useEffect(() => {
        console.log(playlists);
    }, [playlists]);

    useEffect(() => {
        console.log(currPlayList);
        // setHasPlaylist(1);
    }, [currPlayList]);

    return(<div className = "col-auto justify-center">
        {!hasPlaylist && playlists.map(playlist => 
            <PlaylistCard name = {playlist.name}
                imgSrc = {playlist.images[2]?.url}
                selectPlaylist = {setCurrPlayList}
                setHasPlaylist = {setHasPlaylist}
                id = {playlist.id}
                key = {playlist.id}
                />
        )}

        {hasPlaylist && <h1>{currPlayList}</h1>}
    </div>)
}












// Playlist Management Features (OBLIGATORIO)
// ✅ Funcionalidades Requeridas
// Eliminar Tracks Individuales

// // Permitir remover canciones específicas de la playlist
// const removeTrack = (trackId) => {
//   setPlaylist(playlist.filter(track => track.id !== trackId))
// }
// Marcar Tracks como Favoritos ⭐

// // Guardar favoritos en localStorage
// const toggleFavorite = (track) => {
//   const favorites = JSON.parse(localStorage.getItem('favorite_tracks') || '[]')
//   const isFavorite = favorites.find(f => f.id === track.id)

//   if (isFavorite) {
//     const updated = favorites.filter(f => f.id !== track.id)
//     localStorage.setItem('favorite_tracks', JSON.stringify(updated))
//   } else {
//     favorites.push(track)
//     localStorage.setItem('favorite_tracks', JSON.stringify(favorites))
//   }
// }
// Refrescar Playlist Generada

// Botón para regenerar playlist con las mismas preferencias
// Obtener nuevas recomendaciones
// Añadir Más Canciones

// Permitir ampliar la playlist existente
// Mantener canciones actuales y añadir nuevas
// 🎯 Funcionalidades Opcionales
// Drag & Drop Reordering (Opcional)

// Reordenar canciones arrastrando
// Usar librerías como react-beautiful-dnd
// Guardar en Spotify (Opcional)

// POST /users/{user_id}/playlists
// POST /playlists/{playlist_id}/tracks
// Sincronizar con cuenta de Spotify
// Considerar Favoritos en Generación (Opcional)

// Usar canciones favoritas como seeds
// Ponderación según preferencias guardadas