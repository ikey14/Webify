'use-client'

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createPlaylist, getPlaylistByID, getTrackByID, getUserPlaylists, removeFromPlaylist } from '@/app/api/ApiCall'
import PlaylistCard from './PlaylistCard';
import TrackCard from './TrackCard';

export default function PlaylistDisplay({ generatePlayList, updatePlayList })
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
    const [loading, setLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();

    async function toggleFav(id)
    {
        const track = await getTrackByID(id); 
        const favorites = JSON.parse(localStorage.getItem('favorite_tracks') || '[]')        
        const isFavorite = favorites.find(f => f.id === track.id)

        if (isFavorite) {
            const updated = favorites.filter(f => f.id !== track.id)
            localStorage.setItem('favorite_tracks', JSON.stringify(updated))
        } else {
            favorites.push(track)
            localStorage.setItem('favorite_tracks', JSON.stringify(favorites))
        }
    }

    async function removeTrack(id)
    {
        // const oldTrackIDs = oldTracks.map(item => "spotify:track:" + item.track.id.toString());
        const oldTrack = "spotify:track:" + id.toString();
        await removeFromPlaylist(currPlayList.id, oldTrack);
        await handlePlaylistSelect(currPlayList.id);
    }
    
    async function handleGeneratePlayList(id, oldTracks)
    {
        await generatePlayList(id, oldTracks);
        await handlePlaylistSelect(id);
    }

    async function handleUpdatePlayList(id, currTracks)
    {
        // console.log(currTracks);
        await updatePlayList(id, currTracks);
        await handlePlaylistSelect(id);
    }
    
    async function newPlaylist(data)
    {
        // console.log(data)
        const newPL = await createPlaylist(data.name, data.description, data.public);
        // console.log(newPL);
        setShowNewPL(false);

        handlePlaylistSelect(newPL.id);
    }

    async function handlePlaylistSelect(id)
    {
        try
        {
            setLoading(true);
            const data = await getPlaylistByID(id);

            setCurrPlayList({
                id: data.id,
                name: data.name,
                imgSrc: data.images?.[0]?.url,
                description: data.description,
                trackItems: data.tracks?.items
            })

            setHasPlaylist(true);
        }
        catch(err)
        {
            // console.log(err);
            setHasPlaylist(false);
        }
        finally
        {
            setLoading(false);
        }
    }

    async function loadPlaylists() 
    {
        try
        {
            setLoading(true);
            const data = await getUserPlaylists(limit);
            // ensure an array
            setPlayLists(data.items || []);
        }
        catch(err)
        {
            // console.log(err);
        }
        finally
        {
            setLoading(false);
        }

    }

    useEffect(() => {
        loadPlaylists();
        // console.log(playlists);
    }, [hasPlaylist]);

    // useEffect(() => {
    //     // console.log(playlists);
    // }, [playlists]);

    // useEffect(() => {
    //     // console.log(currPlayList);
    // }, [currPlayList]);


    // flex flex-1 flex-col border-2 rounded-xl w-full min-w-1/3 overflow-hidden md:justify-center mb-auto

    return(<div className = "flex flex-col border-2 rounded-xl w-full h-full overflow-hidden">
        
        {loading && (<div className = "flex justify-center my-4">
            <div className = "w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>)}
        
        <div className = "max-h-130 overflow-y-auto mt-1">
        {!hasPlaylist && !showNewPL && !loading && playlists.map(playlist =>
            <PlaylistCard name = {playlist.name}
                imgSrc = {playlist.images?.[0]?.url}
                selectPlaylist = {handlePlaylistSelect}
                id = {playlist.id}
                key = {playlist.id}
            />
        )}
        </div>

        {!hasPlaylist && !showNewPL && !loading && <div>
            
            <button 
                onClick = {() => setShowNewPL(true)} 
                className = "border-2 rounded-xl p-2 m-2 hover:cursor-pointer hover:bg-linear-to-br hover:from-white/0 hover:via-black/0 hover:to-white"
            >
            NEW
            </button>

        </div>}

        {showNewPL && !loading && <div>

            <div className = "items-start">
                <button 
                    onClick = {() => setShowNewPL(false)} 
                    className = "text-3xl border-2 border-red-600 rounded-xl mt-1 mb-5 ml-1 h-fit hover:cursor-pointer hover:bg-linear-to-br from-red-600 via-black/0 to-white/0"
                >
                ⬅
                </button>
            </div>

            <div className = "flex justify-center items-center md:block md:items-start">
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
                <input 
                    type = "submit" 
                    className = "border-2 rounded-xl m-2 p-1 hover:cursor-pointer hover:bg-linear-to-br from-white/0 via-black/0 to-white"
                />
                </form>
            </div>
        </div>}

        {hasPlaylist && !loading && <div className = "flex flex-col">
            <div className = "flex flex-row justify-between">
                <button 
                    onClick = {() => setHasPlaylist(false)} 
                    className = "text-3xl border-2 border-red-600 rounded-xl mt-1 ml-1 p-1 hover:cursor-pointer hover:bg-linear-to-br from-red-600 via-black/0 to-white/0"
                >
                ⬅
                </button>
                <div className = "flex flex-row">
                    <button 
                        onClick = {() => handleGeneratePlayList(currPlayList.id, currPlayList.trackItems)}
                        className = "p-1 m-1 border-2 border-white rounded-xl hover:cursor-pointer hover:bg-linear-to-br from-blue-800/0 via-black/0 to-red-600"
                    >
                    REPLACE
                    </button>

                    <button 
                        onClick = {() => handleUpdatePlayList(currPlayList.id, currPlayList.trackItems)}
                        className = "p-1 m-1 border-2 border-white rounded-xl hover:cursor-pointer hover:bg-linear-to-br from-blue-800/0 via-black/0 to-green-600"
                    >
                    UPDATE
                    </button>
                </div>
            </div>
            <div className = "flex flex-col items-center justify-center">
                <img src = {currPlayList.imgSrc} className = "border-4 border-white rounded-xl my-2 max-h-42 max-w-42" />
                <h1 className = "m-1 flex text-center text-3xl">{currPlayList.name}</h1>
                {/* <p className = "m-1">ID: {currPlayList.id}</p> */}
                <p className = "m-1">{currPlayList.description}</p>
            </div>

            <div className = "m-3 flex flex-col max-h-82 overflow-y-auto mt-1">
                {currPlayList.trackItems?.map(item =>
                    <TrackCard
                        id = {item.track.id}
                        key = {item.track.id}
                        name = {item.track.name}
                        imgSrc = {item.track.album?.images[0]?.url}
                        artist = {item.track.artists?.[0]?.name}
                        favTrack = {toggleFav}
                        removeTrack = {removeTrack}
                    />
                )}
            </div>
        </div>}
    </div>)
}