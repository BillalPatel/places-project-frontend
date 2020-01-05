import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/input/Input';
import Card from '../../shared/components/UIElements/card/Card';
import Button from '../../shared/components/FormElements/button/Button';
import ErrorModal from '../../shared/components/UIElements/modal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/loadingSpinner/LoadingSpinner';
import { useForm } from '../../shared/hooks/form';
import { AuthenticationContext } from '../../shared/context/authentication-context';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import './Authentication.css';

const Authentication = () => {
  const auth = useContext(AuthenticationContext);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputChange, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchForm = () => {
    if (!isLoginForm) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginForm((prevMode) => !prevMode);
  };

  const submitAuthentication = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isLoginForm) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (error) {
        setIsLoading(false);
        setError(error.message || 'Something went wrong, please try again shortly');
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (error) {
        setIsLoading(false);
        setError(error.message || 'Something went wrong, please try again shortly');
      }
    }
  };

  const handleError = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={handleError} />
      <Card className="authentication">
        {isLoading && (
          <LoadingSpinner asOverlay />
        )}
        <h2>Login Required</h2>
        <form onSubmit={submitAuthentication}>
          {!isLoginForm && (
            <Input
              id="name"
              elementType="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorMessage="Please enter a name"
              onInput={inputChange}
            />
          )}
          <Input
            id="email"
            elementType="input"
            type="email"
            label="E-Mail Address"
            validators={[VALIDATOR_EMAIL()]}
            errorMessage="Please enter a valid email address."
            onInput={inputChange}
          />
          <Input
            id="password"
            elementType="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorMessage="Please enter a valid password, at least 5 characters."
            onInput={inputChange}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginForm ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchForm}>
          {isLoginForm ? 'Signup Instead' : 'Login'}
        </Button>
      </Card>
    </>
  );
};

export default Authentication;
