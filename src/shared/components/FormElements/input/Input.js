import React, {useReducer} from 'react';

import {validate} from '../../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state, value: action.val, isValid: validate(action.val, action.validators)
      };
      default:
        return state;
  };
}

const Input = (props) => {
  const [currentState, dispatch] = useReducer(inputReducer, {value: '', isValid: false});
  
  const handleFormChange = (event) => {
    dispatch(
      {
        type: 'CHANGE',
        val: event.target.value,
        validators: props.validators
      }
    );
  }

  const el = props.element === 'input' 
    ? (<input 
        id={props.id} 
        type={props.type} 
        placeholder={props.placeholder}
        onChange={handleFormChange}
        value={currentState.value}
    />)
    : (<textarea 
        id={props.id} 
        rows={props.rows || 3}
        onChange={handleFormChange}
        value={currentState.value}
    />);

  return (
      <div className={`form-control ${!currentState.isValid && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
          {el}
          {!currentState.isValid && <h3>{props.errorMessage}</h3>}
      </div>
  )
}

export default Input;