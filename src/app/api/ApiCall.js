import { spotifyRequest } from '@/lib/spotify';

async function getArtists(inputName, limit)
{
  const url = `https://api.spotify.com/v1/search?type=artist&q=${inputName}&limit=${limit}`;
  //llamar a spotifyfetch manejo de errores
  artists = spotifyRequest(url);
  listArtists = JSON.parse(artists);

  return listArtists;
}