import React from 'react'

const Checkbox = ({ className, inputClass ,name,label}) => {
  return (
    <div className={className}>
      <input
        type="checkbox"
        className={`${inputClass} w-6 h-6 rounded mr-4`}
        name={name}
        id="checkbox"
      />
      <label
        htmlFor="checkbox"
        className="text-base font-normal capitalize font-inter"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox