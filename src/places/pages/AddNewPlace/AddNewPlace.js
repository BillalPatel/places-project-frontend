import React, { useCallback, useReducer } from 'react';

import Input from '../../../shared/components/FormElements/input/Input';
import Button from '../../../shared/components/FormElements/button/Button';
import { useForm } from '../../../shared/hooks/form';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import './PlaceForm.css';

const AddNewPlace = () => {
  const [formState, inputChange] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const submitAddNewPlace = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Replace with backend
  };

  return (
    <form className="place-form" onSubmit={submitAddNewPlace}>
      <Input
        id="title"
        elementType="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Please enter a valid title"
        onInput={inputChange}
      />
      <Input
        id="description"
        elementType="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Please enter a valid description"
        onInput={inputChange}
      />
      <Input
        id="address"
        elementType="input"
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
