import React from 'react';

const Select = ({ value, onChange, options, className, ...rest }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${className || ''}`}
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value || option.id} value={option.value || option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;