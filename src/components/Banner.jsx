import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Banner = () => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#fff',
      textAlign: 'center'
    }}>
      <Link to="/">
        <img 
          src={logo} 
          alt="Site Logo" 
          style={{
            height: '120px',
            maxWidth: '100%',
            objectFit: 'contain',
            cursor: 'pointer'
          }}
        />
      </Link>
    </div>
  );
};

export default Banner; 