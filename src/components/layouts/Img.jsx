import React from 'react'

const Img = ({className, src,alt}) => {
  return (
    <div className={`rounded-full overflow-hidden ${className} w-[50px] h-[50px] `}>
      <picture>
        <img src={src} alt={alt} className='w-full h-full object-cover' />
      </picture>
    </div>
  );
}

export default Img