import React, { useReducer, useEffect } from 'react';

import { validate } from '../../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer,
    {
      value: '',
      isValid: false,
      isTouched: false,
    });

  const {id, onInput, type, placeholder, rows, validators, el, label, errorMessage} = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const handleFormChange = (event) => {
    dispatch(
      {
        type: 'CHANGE',
        val: event.target.value,
        validators: validators,
      },
    );
  };

  const touch = () => {
    dispatch({ type: 'TOUCH' });
  };

  const element = el === 'input'
    ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={handleFormChange}
        onBlur={touch}
        value={inputState.value}
      />
    )
    : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={handleFormChange}
        onBlur={touch}
        value={value}
      />
    );

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{errorMessage}</p>}
    </div>
  );
};

export default Input;
