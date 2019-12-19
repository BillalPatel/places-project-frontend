import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = (props) => {
  const { show, onClick, children } = props;
  return (
    <CSSTransition
      in={show}
      timeout={250}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );
};

export default SideDrawer;
