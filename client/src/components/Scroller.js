import React from 'react';
import '../Style/LivePage.css';


const ScrollButton = ({ isScrolling, toggleScrolling }) => {
  return (
    <button
    className='live-page-button'
      style={{
        backgroundColor: isScrolling ? '#ff4d4d' : '#4CAF50',
        borderRadius: '5px',
        zIndex: 1000, // Ensure the button is on top
        marginBottom:'50px',
      }}
      onClick={toggleScrolling}
    >
      {isScrolling ? 'Stop Scrolling' : 'Start Scrolling'}
    </button>
  );
};

export default ScrollButton;
