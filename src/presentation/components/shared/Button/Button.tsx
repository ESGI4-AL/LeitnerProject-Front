import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  to?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  className = '',
  onClick,
  children,
  to,
  disabled = false,
}) => {
  if (to) {
    if (disabled) {
      return (
        <span className={`base-button ${className} disabled`}>
          {children}
        </span>
      );
    }
    return (
      <Link
        to={to}
        className={`base-button ${className}`}
        data-testid="button-link"
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
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
