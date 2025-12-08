'use-client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";


export default function PopularityWidget({ setPreferences })
{
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(100);
    const [selectedPopularity, setSelectedPopularity] = useState([]);

    function handleSelect(lowP, highP)
    {
        setSelectedPopularity([lowP, highP]);
    }

    useEffect(() => {
        // console.log(minVal);
        handleSelect(minVal, maxVal);
    }, [minVal, maxVal]);

    useEffect(() => {
        // console.log(selectedPopularity);
        setPreferences(prev => ({...prev, popularity: selectedPopularity}));
    }, [selectedPopularity]);

    // min-h-1/3 h-full max-h-1/3 min-w-1/6 w-full max-w-1/3

    return (<div className = "border-2 border-blue-600 m-2 p-2 rounded-xl flex flex-col">
        <div className = "grid grid-cols-1">
            <label className = "text-center text-xl lg:text-2xl my-2">Popularity Range </label>
            <label className = "text-center text-blue-600">MIN</label>
            <div className = "border-2 border-blue-600 h-fit rounded-xl flex flex-col justify-center items-center mb-3 brightness-70 hover:brightness-100 transition duration-150">
                <input
                    type="range"
                    min = "0"
                    max = "100"
                    placeholder = "MIN"
                    value = {minVal}
                    onChange = {(e) => setMinVal(Math.min(Number(e.target.value), maxVal))}
                    className = "w-full"
                />
            </div>
            <label className = "text-center text-red-600">MAX</label>
            <div className = "border-2 border-red-600 h-fit rounded-xl flex flex-col justify-center items-center mb-3 brightness-70 hover:brightness-100 transition duration-150">
                <input
                    type = "range"
                    min = "0"
                    max = "100"
                    placeholder = "MAX"
                    value = {maxVal}
                    onChange = {(e) => setMaxVal(Math.max(Number(e.target.value), minVal))}
                    className = "w-full"
                />
            </div>
        </div>
    </div>);
}

// Cada widget debe:

// Ser un componente React independiente
// Recibir props: onSelect, selectedItems
// Emitir cambios al componente padre
// Tener un diseño responsive
// Mostrar estado de carga cuando haga peticiones


// 6. 📊 Popularity Widget
// Descripción: Elegir entre hits mainstream o joyas ocultas

// Parámetro: Popularity (0-100)

// Funcionalidades:

// Slider o categorías (Mainstream 80-100, Popular 50-80, Underground 0-50)
// Filtrar canciones por popularidad