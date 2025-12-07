'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import Header from '@/components/Header';
import WidgetContainer from '@/components/WidgetContainer';
import PlaylistDisplay from '@/components/PlaylistDisplay';
import { generatePlaylist } from '@/lib/spotify';
import { addToPlaylist, removeFromPlaylist } from '../api/ApiCall';

export default function Home() {
  // const router = useRouter();
  const [tracks, setTracks] = useState([])
  const [preferences, setPreferences] = useState({});

  async function generateNewPlaylist(id, oldTracks)
  {
    oldTracks.length > 0? await removeFromPlaylist(id, oldTracks) : console.log("No tracks in this playlist")
    const newTracks = await generatePlaylist(preferences);
    console.log(newTracks);
    console.log(oldTracks);
    // return newTracks;
    await addToPlaylist(id, newTracks);
  }

  async function updatePlaylist(id, currentTracks)
  {
    const newTracks = await generatePlaylist(preferences);
    console.log(newTracks);

    //newTracks: track.id
    //currTracks: item.track.id
    const finalTracks = newTracks.filter(newTrack => !currentTracks.some(currTrack => currTrack.track.id === newTrack.id));

    // return newTracks;
    await addToPlaylist(id, finalTracks);
  }

  useEffect(() => {
      // console.log(preferences);
  }, [preferences]);

  return (<div className="min-h-screen overflow-x-hidden bg-fixed bg-cover bg-center blue-Black-White-GradBR">
    <div className = "justify-center flex flex-col">
      <Header hasLogout = {true} />
      <div className = "flex flex-1 flex-col md:flex-row w-full overflow-x-hidden gap-x-2">
        <div className="w-full md:w-1/3 max-w-full mx-3 my-1">
          <PlaylistDisplay tracks = {tracks} setTracks = {setTracks} generatePlayList = {generateNewPlaylist} updatePlayList = {updatePlaylist}/>
        </div>
        <div className="w-full md:w-2/3 max-w-full mx-3 my-1">
          <WidgetContainer tracks = {tracks} setTracks = {setTracks} preferences = {preferences} setPreferences = {setPreferences}/>
        </div>
        
      </div>
    </div>
  </div>);
}