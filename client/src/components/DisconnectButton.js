// DisconnectButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import '../Style/Buttons.css';

const DisconnectButton = () => {
    const navigate = useNavigate();

    const handleDisconnect = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        navigate('/');
    };

    return ( // Move the button here to ensure it is returned as part of the component
        <button className="nav-button" onClick={handleDisconnect}>
            <FontAwesomeIcon icon={faPowerOff} />
        </button>
    );
};

export default DisconnectButton;
