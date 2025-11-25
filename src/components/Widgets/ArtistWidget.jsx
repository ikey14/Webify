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