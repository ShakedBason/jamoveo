import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import useAuth from '../middlwear/auth';
import DisconnectButton from '../components/DisconnectButton';

const UserMainPage = () => {
    const navigate = useNavigate();
    console.log()
    useAuth(false);
    //using useEffect because using socket is a side affect!
  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACKEND_URL);
    
    // Listen for the songChanged event from the server
    socket.on('songChanged', (song) => {
      // Redirect to livePage when a song is selected
      navigate('/livePage', { state: { selectedSong: song } });
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  return (
    <div className='page-container'>
      <h1 style={{color:'black'}}>Waiting for next song</h1>
      <DisconnectButton></DisconnectButton>
    </div>
  );
};

export default UserMainPage;
