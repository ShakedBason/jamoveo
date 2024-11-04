import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SongsFeed from '../components/SongsFeed';
import useAuth from '../middlwear/auth';
import { useSocket } from '../SocketContext';
import Swal from 'sweetalert2';
import DisconnectButton from '../components/DisconnectButton';

const ResultsPage = () => {
  useAuth(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { songs } = location.state || { songs: [] };
  const socket = useSocket();

  const fetchLyrics = async (fileName) => {
    try {
      if(fileName){
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getSongByFileName?fileName=${encodeURIComponent(fileName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token here
        },
      });

      if (!response.ok) throw new Error('Failed to fetch lyrics');
      const lyricsData = await response.json();
      return lyricsData.lyrics;
    }
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Lyrics could not be loaded.',
      });
      return null;
    }
  };

  const handleSongSelect = async (song) => {
    if (socket) {
      const lyrics = await fetchLyrics(song.fileName);

      if (!lyrics) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Song lyrics are not available.',
        });
        return;
      }

      const selectedSong = { ...song, lyrics };
      console.log(selectedSong);
      socket.emit('adminSongSelection', selectedSong);
      navigate('/livePage', { state: { selectedSong } });
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
      <DisconnectButton/>
    </div>
  );
};

export default ResultsPage;
