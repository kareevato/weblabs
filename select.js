import React from 'react';
import './select.css';

export default function Select({ value, onChange, options, placeholder = 'Select', className = '', ...props }) {
  return (
    <select 
      className={`custom-select ${className}`}
      value={value}
      onChange={onChange}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
}


