import React from 'react';
import '../Style/AppStyle.css';

const h1Style = {
  fontSize: '50px',
  color: '#ffffff',
  marginBottom: '15px',
};

const AppLayout = ({ instrument, setInstrument }) => {
  return (
    <div style={{
      backgroundColor: '#ad19d2', // Correct the spelling to `backgroundColor`
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <h1 style={h1Style}>Jamoveo</h1>
    </div>
  );
};

export default AppLayout;
