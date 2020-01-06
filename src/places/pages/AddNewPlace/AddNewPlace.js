import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/input/Input';
import Button from '../../../shared/components/FormElements/button/Button';
import LoadingSpinner from '../../../shared/components/UIElements/loadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/modal/ErrorModal';
import { useForm } from '../../../shared/hooks/form';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthenticationContext } from '../../../shared/context/authentication-context';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import './PlaceForm.css';

const AddNewPlace = () => {
  const auth = useContext(AuthenticationContext);
  const {
    isLoading, error, sendRequest, clearError
  } = useHttpClient();
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

  const history = useHistory();

  const submitAddNewPlace = async (event) => {
    event.preventDefault();

    try {
      await sendRequest('http/localhost:5000/api/places',
        'POST',

        { 'Content-Type': 'application/json' },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId
        }));
      history.push('/');
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={submitAddNewPlace}>
        {isLoading && <LoadingSpinner asOverlay /> }
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
    </>
  );
};

export default AddNewPlace;
