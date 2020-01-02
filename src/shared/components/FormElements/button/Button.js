import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = (props) => {
  const {
    href, size, inverse, danger, to, exact, children,
  } = props;

  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${inverse
          && 'button--inverse'} ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`button button--${size || 'default'} ${inverse
          && 'button--inverse'} ${danger && 'button--danger'}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${props.inverse
        && 'button--inverse'} ${props.danger && 'button--danger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
