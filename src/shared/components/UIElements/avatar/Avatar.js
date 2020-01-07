import React from 'react';

import './Avatar.css';

const Avatar = (props) => {
  const {
    className, style, imageUrl, alt, width
  } = props;

  return (
    <div className={`avatar ${className}`} style={style}>
      <img
        src={imageUrl}
        alt={alt}
        style={{ width, height: width }}
      />
    </div>
  );
};

export default Avatar;
