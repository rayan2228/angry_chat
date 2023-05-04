import React from 'react'

const Button = ({text,className,onClick}) => {
  return (
    <div className={`${className} mt-6`}>
      <button
        className="w-full xl:w-[492px] bg-primary py-3 text-white font-inter font-semibold text-xl rounded-md"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Button