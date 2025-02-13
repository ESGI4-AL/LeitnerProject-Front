import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  onClick,
  children,
  to
}) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`base-button ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
