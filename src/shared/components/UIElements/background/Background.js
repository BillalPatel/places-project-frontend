import React from 'react';

import './Background.css';

const Background = (props) => {
  const { onClick } = props;
  return (
    <div className="background" onClick={onClick} />
  );
};

export default Background;
