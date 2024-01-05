import React from 'react';
import styled from 'styled-components';

const ButtonStyles = styled.button`
  width: 150px;
  font-weight: 600;
  background-color: #003568;
  color: white;
  padding: 10px 5px;
  cursor: pointer;
  border-radius: 5px;
  // border-radius: 8px;
  margin: 0px;

  &:hover {
    color: white;
    box-shadow: 4px 4px 10px white;
    border: 4px solid black;
  }
`;

const Button = ({ onClick, children, className }) => {
  return (
    <ButtonStyles onClick={onClick} className={className}>
      {children}
    </ButtonStyles>
  );
};

export default Button;
