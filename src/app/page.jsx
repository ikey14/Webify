'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (<div className = "justify-center flex flex-col h-screen blue-Black-White-GradBR">
    
    <Header hasLogout = {false} />
    
    <div className = "justify-center flex p-8">
      <button onClick = {handleLogin} className = "border-2 hover:cursor-pointer hover:bg-linear-to-br from-green-600 to-black rounded-2xl p-2">LOGIN</button>
    </div>

  </div>);
}