import React, { ButtonHTMLAttributes, FC } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
};

interface PolrsButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'lg';
} 

const Button: FC<PolrsButtonProps> = (props) => {

  const { children, backgroundColor, textColor, borderRadius, variant, ...rest } = props;

  const getBGColor = () => {
    if (variant === 'secondary') {
      return '#0E0E10';
    }
    else {
      return '#00B2FF'
    }
  }

  const getTextColor = () => {
    if (variant === 'secondary') {
      return '#7E7E7E';
    }
    else {
      return '#0E0E10'
    }
  }

  const getBorder = () => {
    if (variant === 'secondary') {
      return '1px solid #7E7E7E';
    }
    else {
      return 'none'
    }
  }

  const getPadding = () => {
    if (props.size === 'sm') {
      return '8px 16px';
    }
    else if (props.size === 'lg') {
      return '14px 32px';
    }
    else {
      return '10px 24px';
    }
  }

  return (
    <button
      style={{
        backgroundColor: getBGColor(),
        color: getTextColor(),
        margin: '5px 0',
        border: getBorder(),
        padding: getPadding(),
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '15px',
        fontWeight: 'bold',
        borderRadius: '10px'
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
