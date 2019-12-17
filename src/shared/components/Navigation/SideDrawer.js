import React from 'react';
import {CSSTransition} from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = (props) => {
    return (
        <CSSTransition 
            in={props.show} 
            timeout={250} 
            classNames="slide-in-left" 
            mountOnEnter 
            unmountOnExit
        >
            <aside className="side-drawer" onClick={props.onClick}>
                {props.children}
            </aside>
        </CSSTransition>
    )
}

export default SideDrawer;