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