'use-client'

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createPlaylist, getPlaylistByID, getUserPlaylists } from '@/app/api/ApiCall'
import PlaylistCard from './PlaylistCard';
import TrackCard from './TrackCard';

export default function PlaylistDisplay({ tracks, setTracks, preferences, generatePlayList })
{
    let limit = 10;
    //0 if no playlist selected, 1 if there is a playlist selected
    const [hasPlaylist, setHasPlaylist] = useState(false);
    //Stores all of the user's playlist
    const [playlists, setPlayLists] = useState([]);
    //Stores current playlist's ID
    const [currPlayList, setCurrPlayList] = useState({});
    //To show new playlist creatin screen
    const [showNewPL, setShowNewPL] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();

    async function newPlaylist(data)
    {
        // console.log(data)
        const newPL = await createPlaylist(data.name, data.description, data.public);
        // console.log(newPL);
        setShowNewPL(false);
        // await handlePlaylistSelect(newPL.id);

        setCurrPlayList({
            id: newPL.id,
            name: newPL.name,
            imgSrc: "noPlaylistImage.jpg",
            description: newPL.description,
            trackItems: newPL.tracks?.items
        })

        setHasPlaylist(true);
    }

    // const newPlaylist = data => console.log(data);

    async function handlePlaylistSelect(id)
    {
        const data = await getPlaylistByID(id);
        setCurrPlayList({
            id: data.id,
            name: data.name,
            imgSrc: data.images[0]?.url,
            description: data.description,
            trackItems: data.tracks?.items
        })

        setHasPlaylist(true);
    }

    async function loadPlaylists() 
    {
        const data = await getUserPlaylists(limit);
        // ensure an array
        setPlayLists(data.items || []);
    }

    useEffect(() => {
        loadPlaylists();
        // console.log(playlists);
    }, []);

    useEffect(() => {
        // console.log(playlists);
    }, [playlists]);

    useEffect(() => {
        console.log(currPlayList);
        // setHasPlaylist(1);
    }, [currPlayList]);

    return(<div className = "flex flex-1 flex-col border-2 rounded-xl min-w-1/4 w-full max-w-2/6 mb-auto mr-2 ml-1.5">
        {!hasPlaylist && !showNewPL && playlists.map(playlist => 
            <PlaylistCard name = {playlist.name}
                imgSrc = {playlist.images[0]?.url}
                selectPlaylist = {handlePlaylistSelect}
                id = {playlist.id}
                key = {playlist.id}
            />
        )}

        {!hasPlaylist && !showNewPL && <div>
            
            <button onClick = {() => setShowNewPL(true)} className = "border-2 rounded-xl p-2 m-2 hover:cursor-pointer">NEW</button>

        </div>}

        {showNewPL && <div>
            <form onSubmit={handleSubmit(newPlaylist)}>
            <div>
                <input 
                    {...register('name', { required: true, maxLength: 40 })} 
                    className = "border-2 rounded-xl m-2"
                    placeholder = ' Name'
                />
                {errors.name?.type === 'required' && "Playlist name is required"}
                {errors.name?.type === 'maxLength' && "Playlist name must be less than 40 characters."}
            </div>
            <div className = "max-h-70 h-full">
                <input 
                    {...register('description', { maxLength: 300 })} 
                    className = "border-2 rounded-xl m-2"
                    placeholder = ' Description'
                />
                {errors.description?.type === 'maxLength' && "Playlist description must be less than 300 characters."}
            </div>
            <div>
                <label className = "m-2">Public</label>
                <input 
                    {...register('public', { required: false })} 
                    className = "border-2 rounded-xl m-2"
                    type = "checkbox"
                />
            </div>
            <input type = "submit" className = "border-2 rounded-xl m-2 p-1 hover:cursor-pointer"/>
            </form>
        </div>}

        {hasPlaylist && <div className = "flex flex-col">
            <div>
                <button 
                    onClick = {() => setHasPlaylist(false)} 
                    className = "text-3xl border-2 border-red-600 rounded-xl m-2 p-1 hover:cursor-pointer"
                >
                ⬅
                </button>
            </div>
            <div className = "flex flex-col items-center justify-center">
                <img src = {currPlayList.imgSrc} className = "border-4 border-white rounded-xl m-3 max-h-50 max-w-50" />
                <h1 className = "m-1">{currPlayList.name}</h1>
                <p className = "m-1">ID: {currPlayList.id}</p>
                <p className = "m-1">{currPlayList.description}</p>
                <button 
                    onClick = {() => generatePlayList(currPlayList.id, currPlayList.trackItems)} 
                    className = "p-1 m-1 border-2 border-white rounded-xl hover:cursor-pointer"
                >GENERATE</button>
            </div>

            <div className = "m-3 flex flex-col">
                {currPlayList.trackItems?.map(item =>
                    <TrackCard
                        id = {item.track.id}
                        key = {item.track.id}
                        name = {item.track.name}
                        imgSrc = {item.track.album?.images[0]?.url}
                    />
                )}
            </div>
        </div>}
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