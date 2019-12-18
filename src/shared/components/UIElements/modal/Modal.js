import React from 'react';
import {CSSTransition} from 'react-transition-group';

import Background from '../background/Background';
import './Modal.css';

const Modal = (props) => {
  return (
    <>
      {props.show && <Background onClick={props.onCancel} />}
      <CSSTransition 
        in={props.show} 
        classNames="modal" 
        mountOnEnter 
        unmountOnExit 
        timeout={250}
      >
        <Overlay {...props} />
      </CSSTransition>
    </>
  )
}

const Overlay = (props) => {
  return (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault}>
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  )
}

export default Modal;