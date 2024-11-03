import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useSocket } from '../SocketContext'; // Use the socket context

const QuitButton = () => {
  const navigate = useNavigate();
  const socket = useSocket();

  const handleQuit = () => {
    socket.emit('quit'); // Emit 'quit' event to server
  };

  // Listen for a confirmation that the quit event was received by all users
  React.useEffect(() => {
    socket.on('quit', () => {
      navigate('/admin/home'); // Navigate to admin home when all users have quit
    });


    return () => {
      socket.off('quit');
    };
  }, [navigate, socket]);

  return (
    <button onClick={handleQuit} className='live-page-button'
    style={{
      backgroundColor:'#ff4d4d',
      borderRadius: '5px',
      zIndex: 1000, // Ensure the button is on top
    }}>
      Quit
    </button>
  );
};

export default QuitButton;
