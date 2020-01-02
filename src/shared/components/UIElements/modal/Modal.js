import React from 'react';

import { CSSTransition } from 'react-transition-group';

import Background from '../background/Background';
import './Modal.css';

const Modal = (props) => {
  const {
    show, onCancel, className, style,
  } = props;

  return (
    <>
      {show && <Background onClick={onCancel} />}
      <CSSTransition
        in={show}
        classNames="modal"
        mountOnEnter
        unmountOnExit
        timeout={250}
      >
        <Overlay {...props} />
      </CSSTransition>
    </>
  );
};

const Overlay = (props) => {
  const {
    className, style, headerClass, header, onSubmit, contentClass, children, footerClass, footer,
  } = props;

  return (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit || ((event) => event.preventDefault())}>
        <div className={`modal__content ${contentClass}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClass}`}>
          {footer}
        </footer>
      </form>
    </div>
  );
};

export default Modal;
