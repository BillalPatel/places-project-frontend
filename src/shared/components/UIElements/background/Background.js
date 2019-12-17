import React from 'react';

import './Background.css';

const Background = props => {
  return (
    <div className="background" onClick={props.onClick}></div>
  )
}

export default Background;
