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
    // return newTracks;
    await addToPlaylist(id, newTracks);
  }

  useEffect(() => {
      // console.log(preferences);
  }, [preferences]);

  return (<div className = "justify-center flex flex-col min-h-screen bg-fixed bg-cover bg-center blue-Black-White-GradBR">
    <Header hasLogout = {true} />
    <div className = "flex flex-1 w-full row-auto">
      <PlaylistDisplay tracks = {tracks} setTracks = {setTracks} generatePlayList = {generateNewPlaylist}/>
      <WidgetContainer tracks = {tracks} setTracks = {setTracks} preferences = {preferences} setPreferences = {setPreferences}/>
    </div>

  </div>);
}