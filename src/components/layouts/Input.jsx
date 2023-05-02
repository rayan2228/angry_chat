import React from "react";

const Input = ({ type, placeholder, inputClass, className, name, value ,label}) => {
  return (
    <div className={className}>
        <label className="block my-4 text-base font-semibold capitalize font-inter">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`${inputClass} w-full xl:w-[492px] py-[14px] pl-3 border border-border_primary outline-border_primary placeholder:font-inter placeholder:text-base placeholder:font-normal`}
        name={name}
        value={value}
      />
    </div>
  );
};

export default Input;
