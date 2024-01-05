import React from 'react';

const Label = ({ htmlFor, labelText }) => {
  return (
    <label className='formLabel' htmlFor={htmlFor}>
      {labelText}
    </label>
  );
}

export default Label;
