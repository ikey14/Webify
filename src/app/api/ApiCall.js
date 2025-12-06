import { spotifyAddToPlaylistRequest, spotifyNewPlaylistRequest, spotifyRequest } from '@/lib/spotify';

export async function getUserPlaylists(limit)
{
  // const userUrl = 'https://api.spotify.com/v1/me';
  const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}`;
  // console.log("Getting all playlists from user: " + userName)
  //llamar a spotifyfetch manejo de errores
  const playlists = await spotifyRequest(url);
  return playlists;
}

export async function getPlaylistByID(id)
{
  const url = `https://api.spotify.com/v1/playlists/${id}`
  // console.log("Getting all playlists from user: " + userName)
  //llamar a spotifyfetch manejo de errores
  const playlists = await spotifyRequest(url);
  return playlists;
}

export async function createPlaylist(name, description, isPublic)
{
  const body = {name: name, description: description, public: isPublic};
  const newPlaylist = await spotifyNewPlaylistRequest(body);
  return newPlaylist;
}

export async function addToPlaylist(id, newTracks)
{
  const newTrackIDs = newTracks.map(track => "spotify:track:" + track.id.toString());
  const snapshot = await spotifyAddToPlaylistRequest(id, newTrackIDs);
  return snapshot;
}

export async function getArtists(inputName, limit)
{
  const url = `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(inputName)}&limit=${limit}`;
  console.log("Getting all artists with: " + inputName)
  //llamar a spotifyfetch manejo de errores
  const artists = await spotifyRequest(url);
  return artists;
}

export async function getTracks(inputName, limit)
{
  const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(inputName)}&limit=${limit}`;
  console.log("Getting all tracks with: " + inputName)
  //llamar a spotifyfetch manejo de errores
  const artists = await spotifyRequest(url);
  return artists;
}