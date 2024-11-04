import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../Style/AppStyle.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../middlwear/auth'
import DisconnectButton from '../components/DisconnectButton';

const AdminMainPage = () => {

  const [filteredSongs, setFilteredSongs] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  useAuth(true);

  const handleSearch = async (event) => {
    event.preventDefault();
    if(!searchTerm.trim()){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter song or an artist.',
        });
        return; 
      }

    try {
      console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/songs/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFilteredSongs(data.songs);
        console.log('Navigating to ResultsPage with songs:', data.songs);
        navigate('/admin/results', { state: { songs: data.songs } });
        
      }
      else {
        throw new Error('Search action failed');
      }

    } catch (error) {
      console.error('Error during Searching:', error);
      Swal.fire('Error!', 'Search Action failed. Please try again.', 'error');
    }
  };

  return (
    <div>
        <form onSubmit={handleSearch}>
        <div className='login-box'>
          <h2>Search any song...</h2>
          <input
            type="text"
            placeholder="Search for a song/artist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="submit">search</button>
          </div>
          <DisconnectButton></DisconnectButton>
        </form>
      </div>
  );
};

export default AdminMainPage;
