import React, { useState } from 'react';
import RegistrationForm from '../components/RegisterationForm';
import Swal from 'sweetalert2';
import '../Style/AppStyle.css';
import { useNavigate } from 'react-router-dom';
import { validateRegistration } from '../Utils/RegisterationValidation';

const UserRegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [instrument, setInstrument] = useState('');
  const navigate=useNavigate();

  const handleAdminSubmit = async (event) => {
    event.preventDefault();
    console.log('Registering admin:', username, password, instrument);
    
    if (!validateRegistration(username, password, instrument)) {
      return;
    }


    try {
      console.log(process.env.REACT_APP_BACKEND_URL);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, instrument, isAdmin: false }),
      });
  
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message);
      }
  
      Swal.fire('Success!', 'Registration and login succeeded!', 'success').then(() => {
        navigate('/'); // Redirect to login
      });
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire('Error!', error.message, 'error');
    }
  };

  return (
    <div>
    <div className='login-box'>
    <h2 >User Registeration</h2>
    <form onSubmit={handleAdminSubmit}>
      <RegistrationForm 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        instrument={instrument}
        setInstrument={setInstrument}
      />
      <button type="submit">Register</button>
    </form>
    </div>
    </div>
  );
};

export default UserRegistrationPage;
