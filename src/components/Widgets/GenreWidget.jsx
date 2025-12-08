'use-client'

import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form";


export default function GenreWidget({ preferences, setPreferences })
{
    let totalGenres = [ 'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass',
         'blues', 'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill',
         'classical', 'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno',
         'disco', 'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro',
         'french', 'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy',
         'hard-rock', 'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 'indie', 'indie-pop',
         'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin', 'latino', 'malay',
         'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera',
         'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop', 'progressive-house',
         'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 'rock', 'rock-n-roll',
         'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes', 'singer-songwriter', 'ska', 'sleep',
         'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish', 'synth-pop', 'tango', 'techno',
         'trance', 'trip-hop', 'turkish', 'work-out', 'world-music'];

    const [inputGenres, setInputGenres] = useState("");
    const [hasGenres, setHasGenres] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    async function loadGenres(userInput) 
    {
        if (!userInput || userInput === ' ') 
        {
            setHasGenres(false);
            return;
        }

        const data = totalGenres.filter(genre => genre.includes(userInput.toLowerCase()));
        if(data)
        {
            setGenres(data);
            setHasGenres(true);
        }
        else
        {
            setHasGenres(false);
        }
    }

    function handleSelect(newGenre)
    {
        const isInList = selectedGenres.some(oldGenre => oldGenre.genre == newGenre);

        if(!isInList && selectedGenres.length < 5)
        {
            setSelectedGenres([...selectedGenres, newGenre]);
        }
        else
        {
            console.log("(GenreWidget) Max length of genres has been reached or genre" + newGenre + "is already selected.");
        }
    }

    useEffect(() => {
        console.log(genres);
    }, [genres]);

    useEffect(() => {
        console.log(inputGenres);
        loadGenres(inputGenres);
    }, [inputGenres]);

    useEffect(() => {
        console.log(selectedGenres);
        setPreferences(prev => ({...prev, genres: selectedGenres}));
    }, [selectedGenres]);

    function handleSubmit(e)
    {
        e.preventDefault();
    }
    
    function handleChange(e)
    {
        console.log("(GenreWidget) Input: " + e.target.value);
        setInputGenres(e.target.value);
    }

    return (<div className = "border-2 border-yellow-500 m-2 p-2 rounded-xl flex flex-col">
        <div className = "flex xl:flex-row flex-col justify-between items-center mb-1">
            <form onSubmit = {(e) => handleSubmit(e)}>
            <div>
                <input
                    placeholder = " Genre"
                    className = "border-2 border-gray-600 rounded-2xl"
                    onChange = {(e) => handleChange(e)}
                />
            </div>
            </form>
            <div className = "flex flex-row">
                <button 
                    onClick = {() => setSelectedGenres([])} 
                    className = "border-2 rounded-xl p-1 h-fit hover:cursor-pointer hover:bg-linear-to-br from-white/0 via-black/0 to-red-600"
                >
                ❌
                </button>
            </div>
        </div>

        {selectedGenres.length != 0 && <div className = "flex flex-row flex-wrap bg-blue-600/50 rounded-xl p-1 w-full items-center">
            {selectedGenres.map(g => <p key = {g} className = "border rounded-xl p-1 m-1 h-fit">{g}</p>)}
        </div>}

        {hasGenres && <div className = "max-h-130 overflow-y-auto mt-1">
            {genres.map(g => <div key = {g} className = "flex flex-row">
                <div onClick = {() => handleSelect(g)} 
                    className = "flex flex-col items-start justify-center m-3 border-2 border-yellow-500 rounded-xl hover:cursor-pointer"
                >
                    <h1 className = "p-1">{g}</h1>
                </div>
            </div>)}
        </div>}
    </div>);
}

// Cada widget debe:

// Ser un componente React independiente
// Recibir props: onSelect, selectedItems
// Emitir cambios al componente padre
// Tener un diseño responsive
// Mostrar estado de carga cuando haga peticiones


// 3. 🎸 Genre Widget
// Descripción: Seleccionar géneros musicales disponibles

// Endpoint: GET /recommendations/available-genre-seeds (DEPRECATED, no longer usable)

// Funcionalidades:

// Listar todos los géneros disponibles
// Selección múltiple (límite sugerido: 3-5 géneros)
// Filtrado por búsqueda