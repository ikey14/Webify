// Cada widget debe:
// Tener un diseño responsive
// Mostrar estado de carga cuando haga peticiones

// 1. 🎤 Artist Widget
// Descripción: Buscar y seleccionar artistas favoritos

// Endpoint: GET /search?type=artist&q={query}

// Funcionalidades:

// Búsqueda con debouncing
// Mostrar imagen, nombre del artista
// Selección múltiple (límite sugerido: 5 artistas)

'use-client'

import { getArtists } from "@/app/api/ApiCall";
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";


export default function ArtistWidget({ preferences, setPreferences })
{
    // let emptySpaces = "";
    let limit = 10;
    // let privSelectedArtists = [];
    const [inputArtists, setInputArtists] = useState("");
    const [hasArtists, setHasArtists] = useState(false);
    const [artists, setArtists] = useState({});
    const [selectedArtists, setSelectedArtists] = useState([]);

    async function loadArtists(userInput) 
    {
        let data;

        if(userInput && userInput != " ")
        {
            data = await getArtists(userInput, limit);
        }
        else
        {
            setHasArtists(false);
            return;
        }

        if(data.artists.items)
        {
            setArtists(data.artists.items); 
            setHasArtists(true);
        }
        else
        {
            setHasArtists(false);
        }
    }

    function handleSelect(id, name)
    {
        const isInList = selectedArtists.some(artist => artist.id === id);

        if(!isInList && selectedArtists.length < 5)
        {
            setSelectedArtists([...selectedArtists, {id: id, name: name}]);
        }
        else
        {
            console.log("(ArtistWidget) Artist with ID: " + id + " is already selected or the max length of artists has been reached.")
        }
    }

    useEffect(() => {
        console.log(artists);
    }, [artists]);

    useEffect(() => {
        console.log(inputArtists);
        const getData = setTimeout(() => {loadArtists(inputArtists)}, 750);
        return () => clearTimeout(getData);
    }, [inputArtists]);

    useEffect(() => {
        // console.log("(Artist Widget) SELECTED ARTIST USEFFECT");
        console.log(selectedArtists);
        setPreferences(prev => ({...prev, artists: selectedArtists}));
    }, [selectedArtists]);

    function handleSubmit(e)
    {
        e.preventDefault();
    }
    
    function handleChange(e)
    {
        console.log("(ArtistWidget) Input: " + e.target.value);
        setInputArtists(e.target.value);
    }

    return (<div className = "border-2 border-red-600 m-2 p-2 rounded-2xl min-h-1/6 h-full max-h-1/3 min-w-1/6 w-full max-w-1/3">
        <div className = "flex flex-row justify-between items-center mb-1">
            <form onSubmit = {(e) => handleSubmit(e)}>
            <div>
                <input 
                    // {...register('artist', { required: true, maxLength: 30 })} 
                    placeholder = " Artist"
                    className = "border-2 border-gray-600 rounded-2xl"
                    onChange = {(e) => handleChange(e)}
                />
                {/* {errors.artist?.type === 'maxLength' && "Artist debe tener menos de 30 caracteres"} */}
            </div>
            {/* <input type="submit" /> */}
            </form>
            <button onClick = {() => setSelectedArtists([])} className = "border-2 rounded-xl p-1 h-fit hover:cursor-pointer">❌</button>
        </div>

        {selectedArtists.length != 0 && <div className = "flex flex-row flex-wrap bg-blue-600/50 rounded-xl p-1 w-full items-center">
            {selectedArtists.map(artist => <p key = {artist.id} className = "border rounded-xl p-1 m-1 h-fit">{artist.name}</p>)} 
        </div>}

        {hasArtists && <div className = "max-h-10/12">
            {artists.map(artist => <div key = {artist.id} className = "flex flex-row">
                <img 
                    src = {artist.images[0]?.url}
                    onClick = {() => handleSelect(artist.id, artist.name)}
                    className = "border-4 border-red-600 rounded-xl m-3 max-h-1/12 max-w-1/5 hover:cursor-pointer"
                />
                <div className = "flex items-center">
                    <h1>{artist.name}</h1>
                </div>
            </div>)}
        </div>}
    </div>);
}