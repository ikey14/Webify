import { spotifyRequest } from '@/lib/spotify';

export async function getUserPlaylists(userName)
{
  const url = `https://api.spotify.com/v1/users/${userName}/playlists`
  console.log("Getting all playlists from user: " + userName)
  //llamar a spotifyfetch manejo de errores
  const playlists = spotifyRequest(url);
  const objPlaylists = JSON.parse(playlists);

  return objPlaylists;
}

export async function getArtists(inputName, limit)
{
  const url = `https://api.spotify.com/v1/search?type=artist&q=${inputName}&limit=${limit}`;
  console.log("Getting all artists with: " + inputName)
  //llamar a spotifyfetch manejo de errores
  const artists = spotifyRequest(url);
  const objArtists = JSON.parse(artists);

  return objArtists;
}