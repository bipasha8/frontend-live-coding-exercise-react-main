import React from 'react';
import './index.css'; 

const Button = ({ children, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;