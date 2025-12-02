// Cada widget debe:

// Ser un componente React independiente
// Recibir props: onSelect, selectedItems
// Emitir cambios al componente padre
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


export default function ArtistWidget()
{
    let limit = 15;
    const [hasArtists, setHasArtists] = useState(false);
    const [artists, setArtists] = useState({});

    async function loadArtists (userInput) 
    {
        const data = await getArtists(userInput, limit);
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

    useEffect(() => {
        console.log(artists);
    }, [artists]);

    const { register, formState: { errors }, handleSubmit } = useForm();
    function onSubmit(data)
    {
        console.log(data);
        loadArtists(data.artist);
    }

    return (<div className = "border-2 border-white m-2 p-2 rounded-2xl min-w-1/6 w-full max-w-1/3">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <input 
                {...register('artist', { required: true, maxLength: 30 })} 
                placeholder = "Artist" 
                className = "border-2 border-gray-600 rounded-2xl"
            />
            {errors.artist?.type === 'maxLength' && "Username debe tener menos de 30 caracteres"}
        </div>
        {/* <input type="submit" /> */}
        </form>
    </div>);
}