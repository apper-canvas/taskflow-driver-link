import React from 'react';

const FormField = ({ label, id, error, children }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {React.cloneElement(children, {
        id: id,
        className: `${children.props.className || ''} ${error ? 'border-error' : 'border-gray-300'}`
      })}
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default FormField;