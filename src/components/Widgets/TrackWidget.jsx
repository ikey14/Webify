// Cada widget debe:
// Tener un diseño responsive
// Mostrar estado de carga cuando haga peticiones

// 2. 🎵 Track Widget
// Descripción: Buscar y seleccionar canciones favoritas

// Endpoint: GET /search?type=track&q={query}

// Funcionalidades:

// Búsqueda de canciones
// Mostrar portada, título, tracka
// Selección múltiple

'use-client'

import { getTracks } from "@/app/api/ApiCall";
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";


export default function TrackWidget({ setPreferences })
{
    // let emptySpaces = "";
    let limit = 8;
    const maxTracks = 5;
    const [inputTracks, setInputTracks] = useState("");
    const [hasTracks, setHasTracks] = useState(false);
    const [tracks, setTracks] = useState({});
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [showFavs, setShowFavs] = useState(false);
    const [favTracks, setFavTracks] = useState({});
    const [loading, setLoading] = useState(false);

    function toggleShowFavs()
    {
        setShowFavs(!showFavs);
    }

    async function loadTracks(userInput) 
    {
        if (!userInput || userInput === ' ') 
        {
            setHasTracks(false);
            return;
        }

        try {
            setLoading(true);
            const data = await getTracks(userInput, limit);

            if (data?.tracks?.items) 
            {
                setTracks(data.tracks.items);
                setHasTracks(true);
            } 
            else 
            {
                setHasTracks(false);
            }
        } 
        catch (err) 
        {
            console.error(err);
            setHasArtists(false);
        } 
        finally 
        {
            setLoading(false);
        }
    }

    function handleSelect(id, name)
    {
        const isInList = selectedTracks.some(track => track.id === id);

        if(!isInList && selectedTracks.length < maxTracks)
        {
            setSelectedTracks([...selectedTracks, {id: id, name: name}]);
        }
        else
        {
            // console.log("(TrackWidget) track with ID: " + id + " is already selected or the max length of Tracks has been reached.");
        }
    }

    useEffect(() => {
        // console.log(tracks);
    }, [tracks]);

    useEffect(() => {
        // console.log(favTracks);
        setFavTracks(JSON.parse(localStorage.getItem('favorite_tracks') || '[]'));
    }, [showFavs]);

    

    useEffect(() => {
        // console.log(inputTracks);
        const getData = setTimeout(() => {loadTracks(inputTracks)}, 750);
        return () => clearTimeout(getData);
    }, [inputTracks]);

    useEffect(() => {
        // console.log("(track Widget) SELECTED track USEFFECT");
        // console.log(selectedTracks);
        setPreferences(prev => ({...prev, tracks: selectedTracks}));
    }, [selectedTracks]);

    function handleSubmit(e)
    {
        e.preventDefault();
    }
    
    function handleChange(e)
    {
        // console.log("(TrackWidget) Input: " + e.target.value);
        setInputTracks(e.target.value);
    }

    // min-h-1/3 h-full max-h-1/3 min-w-1/6 w-full max-w-1/3

    return (<div className = "border-2 border-r-red-600 border-l-yellow-500 border-t-blue-600 border-b-green-600 m-2 p-2 rounded-xl flex flex-col">
        <div className = "flex xl:flex-row flex-col justify-between items-center mb-1">
            <form onSubmit = {(e) => handleSubmit(e)}>
            <div>
                <input 
                    // {...register('track', { required: true, maxLength: 30 })} 
                    placeholder = {" Track (max:" + maxTracks + ")"}
                    className = "border-2 border-gray-600 rounded-xl max-w-38"
                    onChange = {(e) => handleChange(e)}
                />
                {/* {errors.track?.type === 'maxLength' && "track debe tener menos de 30 caracteres"} */}
            </div>
            {/* <input type="submit" /> */}
            </form>
            <div className = "flex flex-row">
                <button 
                    onClick = {() => toggleShowFavs()} 
                    className = "border-2 rounded-xl p-1 m-1 h-fit hover:cursor-pointer hover:bg-linear-to-br from-pink-500/25 via-pink-500/50 to-pink-500"
                >
                ❤️
                </button>
                <button 
                    onClick = {() => setSelectedTracks([])} 
                    className = "border-2 rounded-xl p-1 m-1 h-fit hover:cursor-pointer hover:bg-linear-to-br from-white/0 via-black/0 to-red-600"
                >
                ❌
                </button>
            </div>
        </div>

        {selectedTracks.length != 0 && <div className = "flex flex-row flex-wrap bg-blue-600/50 rounded-xl p-1 w-full items-center">
            {selectedTracks.map(track => <p key = {track.id} className = "border rounded-xl p-1 m-1 h-fit">{track.name}</p>)} 
        </div>}

        {loading && (<div className = "flex justify-center my-4">
            <div className = "w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>)}

        {hasTracks && !showFavs && <div className = "max-h-80 overflow-y-auto mt-1">
            {tracks.map(track => <div key = {track.id} className = "flex lg:flex-row md:flex-col flex-row">
                <div className = "p-1 m-3 rounded-xl max-h-20 max-w-20 hover:cursor-pointer hover:brightness-50 transition duration-150 bg-linear-to-r from-red-500 via-yellow-500 to-blue-500">
                    <img 
                        src = {track.album?.images[0]?.url}
                        onClick = {() => handleSelect(track.id, track.name)}
                        className = "rounded-xl"
                    />
                </div>
                <div className = "flex flex-col items-start justify-center">
                    <div>
                        <h1>{track.name}</h1>
                    </div>
                    <div>
                        <p className = "text-gray-600">{track.artists[0]?.name}</p>
                    </div>
                </div>
            </div>)}
        </div>}

        

        {showFavs && <div className = "max-h-80 overflow-y-auto mt-1">
            {favTracks.map(track => <div key = {track.id} className = "flex lg:flex-row md:flex-col flex-row">
                <div className = "p-1 m-3 rounded-xl max-h-20 max-w-20 hover:cursor-pointer hover:brightness-50 transition duration-150 bg-linear-to-r from-red-500 via-yellow-500 to-blue-500">
                    <img 
                        src = {track.album?.images[0]?.url}
                        onClick = {() => handleSelect(track.id, track.name)}
                        className = "rounded-xl"
                    />
                </div>
                <div className = "flex flex-col items-start justify-center">
                    <div>
                        <h1>{track.name}</h1>
                    </div>
                    <div>
                        <p className = "text-gray-600">{track.artists[0]?.name}</p>
                    </div>
                </div>
            </div>)}
        </div>}
    </div>);
}