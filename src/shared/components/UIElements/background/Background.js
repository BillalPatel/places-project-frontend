import React from 'react';
import ReactDOM from 'react-dom';

import './Background.css';

const Background = props => {
  return ReactDOM.createPortal(
    <div className="background" onClick={props.onClick}></div>,
    document.getElementById('background-hook')
  );
};

export default Background;
