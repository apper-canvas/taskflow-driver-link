import React from 'react';

const Input = ({ id, type = 'text', value, onChange, className, placeholder, min, autoFocus, ...rest }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${className || ''}`}
      placeholder={placeholder}
      min={min}
      autoFocus={autoFocus}
      {...rest}
    />
  );
};

export default Input;