import React, { useCallback, useReducer } from 'react';

import Input from '../../../shared/components/FormElements/input/Input';
import Button from '../../../shared/components/FormElements/button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import './AddNewPlace.css';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        input: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
          isValid: formIsValid,
        },
      };
    default:
      return state;
  }
};

const AddNewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputChange = useCallback((id, value, isValid) => {
    dispatch(
      {
        type: 'INPUT_CHANGE',
        inputId: id,
        value,
        isValid,
      },
    );
  }, []);

  const submitAddNewPlace = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Replace with backend
  };

  return (
    <form className="place-form" onSubmit={submitAddNewPlace}>
      <Input
        id="title"
        el="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Please enter a valid title"
        onInput={inputChange}
      />
      <Input
        id="description"
        el="textarea"
        label="Description"
        rows="2"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorMessage="Please enter a valid description"
        onInput={inputChange}
      />
      <Input
        id="address"
        el="textarea"
        label="Address"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
        errorMessage="Please enter a valid address"
        onInput={inputChange}
      />
      <Button type="submit" disabled={!formState.isValid}>
                Add Place
      </Button>
    </form>
  );
};

export default AddNewPlace;
