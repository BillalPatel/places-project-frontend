import React from 'react';

import Input from '../../shared/components/FormElements/input/Input';
import Card from '../../shared/components/UIElements/card/Card';
import { useForm } from '../../shared/hooks/form';
import Button from '../../shared/components/FormElements/button/Button';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import './Authentication.css';

const Authentication = () => {
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

  const submitAuthentication = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Replace with backend
  };

  return (
    <Card className="authentication">
      <form className="place-form" onSubmit={submitAuthentication}>
        <h2>Sign In</h2>
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
          Sign in
        </Button>
      </form>
    </Card>
  );
};
export default Authentication;
