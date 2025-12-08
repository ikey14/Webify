'use-client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";

export default function DecadeWidget({ setPreferences })
{
    const decades = ["1960", "1970", "1980", "1990", "2000", "2010"]
    const [selectedDecades, setSelectedDecades] = useState([]);

    function handleSelect(newDec)
    {
        const isInList = selectedDecades.some(currDec => currDec === newDec);

        if(!isInList && selectedDecades.length < 5)
        {
            setSelectedDecades([...selectedDecades, newDec]);
        }
        else
        {
            // console.log("(DecadesWidget) " + newDec + " is already selected or the max length of artists has been reached.");
        }
    }

    useEffect(() => {
        // console.log(selectedDecades);
        setPreferences(prev => ({...prev, decades: selectedDecades}));
    }, [selectedDecades]);

    // min-h-1/3 h-full max-h-1/3 min-w-1/6 w-full max-w-1/3

    return (<div className = "border-2 border-green-600 m-2 p-2 rounded-xl flex flex-col">
        {selectedDecades.length != 0 && <div className = "flex 2xl:flex-row flex-col flex-wrap bg-blue-600/50 rounded-xl p-1 w-full items-center justify-between">
            <div className = "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                {selectedDecades.map(dec => <p key = {dec} className = "border rounded-xl p-1 m-1 h-fit">{dec}</p>)}
            </div>
            <div className = "flex flex-row">
                <button 
                    onClick = {() => setSelectedDecades([])} 
                    className = "border-2 rounded-xl p-1 h-fit hover:cursor-pointer hover:bg-linear-to-br from-white/0 via-black/0 to-red-600"
                >
                ❌
                </button>
            </div>
        </div>}

        <div className = "grid justify-between grid-cols-2 xl:grid-cols-3 h-full p-1 gap-y-6">
            {decades.map(dec => <div key = {dec} className = "h-full">
                <div 
                    onClick = {() => handleSelect(dec)} 
                    className = "h-full flex justify-center items-center mx-2 border-4 border-green-600 rounded-xl hover:cursor-pointer hover:brightness-50 transition duration-150">
                    <h1 className = "text-center text-xl lg:text-2xl">{dec}</h1>
                </div>
            </div>)}
        </div>
    </div>);
}


// Cada widget debe:

// Ser un componente React independiente
// Recibir props: onSelect, selectedItems
// Emitir cambios al componente padre
// Tener un diseño responsive
// Mostrar estado de carga cuando haga peticiones


// 4. 📅 Decade Widget
// Descripción: Elegir décadas/eras musicales preferidas

// Implementación: Filtro por año en búsquedas

// Funcionalidades:

// Selector de décadas (1950s, 1960s, 1970s... 2020s)
// Rango de años personalizado
// Múltiple selección