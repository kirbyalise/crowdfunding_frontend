import React from 'react';
import logo from '../assets/logo.svg';

const Banner = () => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#fff',
      textAlign: 'center'
    }}>
      <img 
        src={logo} 
        alt="Site Logo" 
        style={{
          height: '120px',
          maxWidth: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default Banner; 