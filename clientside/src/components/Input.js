import React from 'react';

const Input = ({ id, value, onChange }) => {
  return (
    <input
      className='inputField'
      type="text"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Input;
