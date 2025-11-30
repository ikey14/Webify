import { spotifyRequest } from '@/lib/spotify';

export async function getUserPlaylists(limit)
{
  const url = `https://api.spotify.com/v1/users/me/playlists?limit=${limit}`
  // console.log("Getting all playlists from user: " + userName)
  //llamar a spotifyfetch manejo de errores
  const playlists = await spotifyRequest(url);
  return playlists;
}

export async function getPlaylistByID(id)
{
  const url = `https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n`
  // console.log("Getting all playlists from user: " + userName)
  //llamar a spotifyfetch manejo de errores
  const playlists = await spotifyRequest(url);
  return playlists;
}

export async function getArtists(inputName, limit)
{
  const url = `https://api.spotify.com/v1/search?type=artist&q=${inputName}&limit=${limit}`;
  console.log("Getting all artists with: " + inputName)
  //llamar a spotifyfetch manejo de errores
  const artists = await spotifyRequest(url);
  return artists;
}