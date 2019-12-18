import React, {useReducer} from 'react';

import {validate} from '../../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state, 
        value: action.val, 
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state, 
        isTouched: true
      }
    }
    default:
      return state;
  };
}

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, 
    {
      value: '', 
      isValid: false, 
      isTouched: false
    }
  );
  
  const handleFormChange = (event) => {
    dispatch(
      {
        type: 'CHANGE',
        val: event.target.value,
        validators: props.validators
      }
    );
  }

  const touch = () => {
    dispatch({type: 'TOUCH'})
  }

  const el = props.el === 'input' 
    ? (<input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder}
        onChange={handleFormChange}
        onBlur={touch}
        value={inputState.value}
    />)
    : (<textarea 
        id={props.id} 
        rows={props.rows || 3}
        onChange={handleFormChange}
        onBlur={touch}
        value={inputState.value}
    />);

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
        {el}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorMessage}</p>}
    </div>
  )
}

export default Input;