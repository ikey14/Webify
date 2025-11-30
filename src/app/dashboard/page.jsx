'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import Header from '@/components/Header';
import WidgetContainer from '@/components/WidgetContainer';
import PlaylistDisplay from '@/components/PlaylistDisplay';

export default function Home() {
  // const router = useRouter();
  const [tracks, setTracks] = useState([])

  // useEffect(() => {
  //   // Si ya está autenticado, redirigir al dashboard
  //   if (isAuthenticated()) {
  //     router.push('/dashboard');
  //   }
  // }, [router]);

  // const handleLogin = () => {
  //   window.location.href = getSpotifyAuthUrl();
  // };

  return (<div className = "justify-center flex flex-col min-h-screen bg-fixed bg-cover bg-center blue-Black-White-GradBR">
    <Header hasLogout = {true} />
    <div className = "flex flex-1 w-full row-auto">
      <PlaylistDisplay tracks = {tracks} setTracks = {setTracks} />
      <WidgetContainer tracks = {tracks} setTracks = {setTracks} />
    </div>

  </div>);
}