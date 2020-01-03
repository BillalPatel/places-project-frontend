import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/input/Input';
import Card from '../../shared/components/UIElements/card/Card';
import Button from '../../shared/components/FormElements/button/Button';
import { useForm } from '../../shared/hooks/form';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import './Authentication.css';

const Authentication = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

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

  const submitAuthentication = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className="authentication">
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
  );
};

export default Authentication;
