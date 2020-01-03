import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/input/Input';
import Card from '../../shared/components/UIElements/card/Card';
import { useForm } from '../../shared/hooks/form';
import Button from '../../shared/components/FormElements/button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import './Authentication.css';

const Authentication = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formState, inputChange] = useForm(
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
    setIsLoginForm((prevMode) => !prevMode);
  };

  const submitAuthentication = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Replace with backend
  };

  return (
    <Card className="authentication">
      <form className="place-form" onSubmit={submitAuthentication}>
        <h2>
          {isLoginForm ? 'Sign In Here' : 'Register your details'}
        </h2>
        <Input
          id="email"
          elementType="input"
          type="email"
          label="E-mail Address"
          validators={[VALIDATOR_EMAIL()]}
          errorMessage="Please enter a valid e-mail address"
          onInput={inputChange}
        />
        <Input
          id="password"
          elementType="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorMessage="Please enter the correct password"
          onInput={inputChange}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginForm ? 'Sign in' : 'Signup'}
        </Button>
      </form>
      <p onClick={switchForm}>
        {isLoginForm ? 'Signup Instead' : 'Login'}
      </p>
    </Card>
  );
};
export default Authentication;
