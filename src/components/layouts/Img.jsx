import React from 'react'

const Img = ({className, src,alt}) => {
  return (
    <div className={className}>
      <picture>
        <img src={src} alt={alt} />
      </picture>
    </div>
  );
}

export default Img