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


export default function TrackWidget({ preferences, setPreferences })
{
    // let emptySpaces = "";
    let limit = 10;
    // let privSelectedTracks = [];
    const [inputTracks, setInputTracks] = useState("");
    const [hasTracks, setHasTracks] = useState(false);
    const [tracks, setTracks] = useState({});
    const [selectedTracks, setSelectedTracks] = useState([]);

    async function loadTracks(userInput) 
    {
        let data;

        if(userInput && userInput != " ")
        {
            data = await getTracks(userInput, limit);
            console.log(data.tracks.items);
        }
        else
        {
            setHasTracks(false);
            return;
        }

        if(data.tracks.items)
        {
            setTracks(data.tracks.items); 
            setHasTracks(true);
        }
        else
        {
            setHasTracks(false);
        }
    }

    function handleSelect(id, name)
    {
        const isInList = selectedTracks.some(track => track.id === id);

        if(!isInList && selectedTracks.length < 5)
        {
            setSelectedTracks([...selectedTracks, {id: id, name: name}]);
        }
        else
        {
            console.log("(TrackWidget) track with ID: " + id + " is already selected or the max length of Tracks has been reached.")
        }
    }

    useEffect(() => {
        console.log(tracks);
    }, [tracks]);

    useEffect(() => {
        console.log(inputTracks);
        const getData = setTimeout(() => {loadTracks(inputTracks)}, 750);
        return () => clearTimeout(getData);
    }, [inputTracks]);

    useEffect(() => {
        // console.log("(track Widget) SELECTED track USEFFECT");
        console.log(selectedTracks);
        setPreferences(prev => ({...prev, tracks: selectedTracks}));
    }, [selectedTracks]);

    function handleSubmit(e)
    {
        e.preventDefault();
    }
    
    function handleChange(e)
    {
        console.log("(TrackWidget) Input: " + e.target.value);
        setInputTracks(e.target.value);
    }

    return (<div className = "border-2 border-black m-2 p-2 rounded-2xl min-h-1/6 h-full max-h-1/3 min-w-1/6 w-full max-w-1/3">
        <div className = "flex flex-row justify-between items-center mb-1">
            <form onSubmit = {(e) => handleSubmit(e)}>
            <div>
                <input 
                    // {...register('track', { required: true, maxLength: 30 })} 
                    placeholder = " Track"
                    className = "border-2 border-gray-600 rounded-2xl"
                    onChange = {(e) => handleChange(e)}
                />
                {/* {errors.track?.type === 'maxLength' && "track debe tener menos de 30 caracteres"} */}
            </div>
            {/* <input type="submit" /> */}
            </form>
            <button onClick = {() => setSelectedTracks([])} className = "border rounded-xl p-1 h-fit hover:cursor-pointer">❌</button>
        </div>

        {selectedTracks.length != 0 && <div className = "flex flex-row flex-wrap bg-blue-600/50 rounded-xl p-1 w-full items-center">
            {selectedTracks.map(track => <p key = {track.id} className = "border rounded-xl p-1 m-1 h-fit">{track.name}</p>)} 
        </div>}

        {hasTracks && <div className = "max-h-10/12">
            {tracks.map(track => <div key = {track.id} className = "flex flex-row">
                <div className = "p-1 m-3 rounded-xl max-h-1/12 max-w-1/5 hover:cursor-pointer bg-linear-to-r from-red-500 via-yellow-500 to-blue-500">
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