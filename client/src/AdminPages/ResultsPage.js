import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SongsFeed from '../components/SongsFeed';
import useAuth from '../middlwear/auth';
import { useSocket } from '../SocketContext'; // Import the socket context
import Swal from 'sweetalert2';

const ResultsPage = () => {
  useAuth(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { songs } = location.state || { songs: [] };
  useAuth(true);

  // Use the socket from SocketProvider
  const socket = useSocket();

  const handleSongSelect = (song) => {
    if (socket) { // Check if socket is connected
      // Emit song selection to server
      if(!song.lyrics){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Song lyrics is not avaliable yet',
        });
        return;
      }
      socket.emit('adminSongSelection', song);
      console.log('Selected song:', song);
      navigate('/livePage', { state: { selectedSong: song } });
    } else {
      console.error('Socket is not connected');
    }
  };

  return (
    <div>
      <div className='login-box'>
        <h2>Search Results:</h2>
        <SongsFeed songs={songs} onSongSelect={handleSongSelect} />
      </div>
    </div>
  );
};

export default ResultsPage;
