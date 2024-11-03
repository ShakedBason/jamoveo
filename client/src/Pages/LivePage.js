// LivePage.js
import React, { useState, useEffect } from 'react';
import '../Style/AppStyle.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollButton from '../components/Scroller';
import LyricsTable from '../components/LyricsTable.jsx';
import QuitButton from '../components/QuitButton'; // Import the QuitButton component
import { useSocket } from '../SocketContext'; // Use the socket context

const LivePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSong } = location.state || { selectedSong: [] };
  const isPlayer = localStorage.getItem('role') === 'player';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if(!localStorage.getItem('token')||!selectedSong){
    navigate('./');
  }

  const [isScrolling, setIsScrolling] = useState(false);
  const socket = useSocket(); // Use the singleton socket instance

  // Check if the title is in Hebrew
  const isHebrewTitle = selectedSong && /[\u0590-\u05FF]/.test(selectedSong.title);

  useEffect(() => {
    if (!localStorage.getItem('token')||!selectedSong) {
      navigate('/');
    }
  }, [selectedSong, navigate]);

  // Automatic scrolling effect
  useEffect(() => {
    let scrollInterval;

    if (isScrolling) {
      scrollInterval = setInterval(() => {
        window.scrollBy(0, 1); 
      }, 20); 
    }

    return () => {
      clearInterval(scrollInterval);
    };
  }, [isScrolling]);

  // Listen for quit event
  useEffect(() => {
    const handleQuit = () => {
      if (isAdmin) {
        navigate('/admin/home');
      } else {
        navigate('/user/home'); 
      }
    };

    console.log('connecting');
    socket.on('quit', handleQuit);

    return () => {
      socket.off('quit', handleQuit); // Cleanup listener
    };
  }, [navigate, socket, isAdmin]);

  if (!selectedSong) {
    return <p>No song selected.</p>; 
  }

  const toggleScrolling = () => setIsScrolling((prev) => !prev);

  return (
    <div style={{ padding: '20px', maxWidth: '100%', overflowX: 'hidden', direction: isHebrewTitle ? 'rtl' : 'ltr', textAlign: isHebrewTitle ? 'right' : 'left' }}>
      <h2 style={{ fontSize: '2vw', whiteSpace: 'nowrap' }}>
        {selectedSong.artist + ' - ' + selectedSong.title}
      </h2>
      <div style={{ marginTop: '20px' }}>
        <LyricsTable lyrics={selectedSong.lyrics} isPlayer={isPlayer} isHebrewTitle={isHebrewTitle} />
      </div>
      <div>
        <ScrollButton isScrolling={isScrolling} toggleScrolling={toggleScrolling} />
        {isAdmin && <QuitButton />}
      </div>
    </div>
  );
};

export default LivePage;
