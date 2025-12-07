import { getAccessToken } from "./auth";

export async function generatePlaylist(preferences) {
  const { artists, genres, decades, popularity, tracks } = preferences;
  const token = getAccessToken();
  let allTracks = [];

  // 1. Obtener tracks explicitamente seleccionadas por el usuario
  if(tracks)
  {
    for (const track of tracks) {
      const newTrack = await fetch(
        `https://api.spotify.com/v1/tracks/${track.id}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await newTrack.json();
      // console.log(data);
      allTracks.push(data);
    }
  }

  // 2. Obtener top tracks de artistas seleccionados
  if(artists)
  {
    for (const artist of artists) {
      const newTracks = await fetch(
        `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await newTracks.json();
      allTracks.push(...data.tracks);
    }
  }


  // 3. Buscar por géneros
  if(genres)
  {
      for (const genre of genres) {
        const results = await fetch(
          `https://api.spotify.com/v1/search?type=track&q=genre:${genre}&limit=20`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        const data = await results.json();
        allTracks.push(...data.tracks.items);
      }
  }


  // 4. Filtrar por década
  if(decades)
  {
    if (decades.length > 0) {
      allTracks = allTracks.filter(track => {
        const year = new Date(track.album.release_date).getFullYear();
        return decades.some(decade => {
          const decadeStart = parseInt(decade);
          return year >= decadeStart && year < decadeStart + 10;
        });
      });
    }
  }


  // 5. Filtrar por popularidad
  if (popularity) {
    const [min, max] = popularity;
    allTracks = allTracks.filter(
      track => track.popularity >= min && track.popularity <= max
    );
  }

  // 6. Eliminar duplicados y limitar a 30 canciones
  const uniqueTracks = Array.from(
    new Map(allTracks.map(track => [track.id, track])).values()
  ).slice(0, 30);

  return uniqueTracks;
}



export async function spotifyRequest(url) 
{
  const token = getAccessToken();
  
  if (!token) 
  {
    // Intentar refrescar token
    // const newToken = await refreshAccessToken();
    const newToken = getAccessToken();
    // const newToken = localStorage.getItem("spotify_refresh_token");
    if (!newToken) 
    {
      // Redirigir a login
      window.location.href = '/';
      return;
    }
  }

  const response = await fetch(url, {headers: { 'Authorization': `Bearer ${token}` }});

  if (response.status === 401) 
  {
    const newToken = getAccessToken();
    // const newToken = localStorage.getItem("spotify_refresh_token");
    
    if(newToken)
    {
      const response = await fetch(url, {headers: { 'Authorization': `Bearer ${newToken}` }});
      if (!response.ok) 
      {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return(response.json());
    }
  }

  if (!response.ok) 
  {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}





export async function spotifyNewPlaylistRequest(body) 
{
  console.log(body);
  const url = `https://api.spotify.com/v1/me/playlists`;
  const token = getAccessToken();
  
  if (!token) 
  {
    // Intentar refrescar token
    // const newToken = await refreshAccessToken();
    const newToken = getAccessToken();
    // const newToken = localStorage.getItem("spotify_refresh_token");
    if (!newToken) 
    {
      // Redirigir a login
      window.location.href = '/';
      return;
    }
  }

  const response = await fetch(url, 
  {method: "POST", 
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({name: body.name, description: body.description, public: body.public})
  });

  if (response.status === 401) 
  {
    const newToken = getAccessToken();
    // const newToken = localStorage.getItem("spotify_refresh_token");
    
    if(newToken)
    {
      const response = await fetch(url, 
      {method: "POST", 
        headers: { 'Authorization': `Bearer ${newToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({name: body.name, description: body.description, public: body.public})
      });
      if (!response.ok) 
      {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return(response.json());
    }
  }

  if (!response.ok) 
  {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}






export async function spotifyAddToPlaylistRequest(id, newTracks) 
{
  console.log(newTracks);
  const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
  const token = getAccessToken();
  // const stringNewTracks = newTracks.toString();
  // console.log(stringNewTracks);
  
  if (!token) 
  {
    // Intentar refrescar token
    // const newToken = await refreshAccessToken();
    const newToken = getAccessToken();
    // const newToken = localStorage.getItem("spotify_refresh_token");
    if (!newToken) 
    {
      // Redirigir a login
      window.location.href = '/';
      return;
    }
  }

  const response = await fetch(url, 
  {method: "POST", 
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({"uris": newTracks, "position": 0})
  });

  if (response.status === 401) 
  {
    const newToken = getAccessToken();
    // const newToken = localStorage.getItem("spotify_refresh_token");
    
    if(newToken)
    {
      const response = await fetch(url, 
      {method: "POST", 
        headers: { 'Authorization': `Bearer ${newToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({"uris": newTracks, "position": 0})
      });
      if (!response.ok) 
      {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return(response.json());
    }
  }

  if (!response.ok) 
  {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}



export async function spotifyRemoveFromPlaylistRequest(id, oldTracks)
{
  console.log(oldTracks);
  const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
  const token = getAccessToken();
  const trackObjects = oldTracks.map(uri => ({ uri }));
  // const stringNewTracks = newTracks.toString();
  // console.log(stringNewTracks);
  
  if (!token) 
  {
    // Intentar refrescar token
    // const newToken = await refreshAccessToken();
    const newToken = getAccessToken();
    // const newToken = localStorage.getItem("spotify_refresh_token");
    if (!newToken) 
    {
      // Redirigir a login
      window.location.href = '/';
      return;
    }
  }

  const response = await fetch(url, 
  {method: "DELETE", 
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({"tracks": trackObjects})
  });

  if (response.status === 401) 
  {
    const newToken = getAccessToken();
    // const newToken = localStorage.getItem("spotify_refresh_token");
    
    if(newToken)
    {
      const response = await fetch(url, 
      {method: "DELETE", 
        headers: { 'Authorization': `Bearer ${newToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({"tracks": trackObjects})
      });
      if (!response.ok) 
      {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return(response.json());
    }
  }

  if (!response.ok) 
  {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}