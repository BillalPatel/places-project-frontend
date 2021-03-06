import React, { useState, useContext } from 'react';

import Input from '../../shared/components/FormElements/input/Input';
import Card from '../../shared/components/UIElements/card/Card';
import Button from '../../shared/components/FormElements/button/Button';
import ImageUpload from '../../shared/components/FormElements/imageUpload/ImageUpload';
import ErrorModal from '../../shared/components/UIElements/modal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/loadingSpinner/LoadingSpinner';
import { useForm } from '../../shared/hooks/form';
import { useHttpClient } from '../../shared/hooks/http';
import { AuthenticationContext } from '../../shared/context/authentication-context';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';
import './Authentication.css';

const Authentication = () => {
  const auth = useContext(AuthenticationContext);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [hasLoginError, setHasLoginError] = useState(false);
  const [hasSignupError, setHasSignupError] = useState(false);
  const {
    isLoading, error, sendRequest, clearError
  } = useHttpClient();

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
          name: undefined,
          imageUrl: undefined
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
          },
          imageUrl: {
            value: null,
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

    const handleFetchResponse = (formType) => {
      if (formType === 'login') {
        setHasLoginError(true);
      } else {
        setHasSignupError(true);
      }
    };


    if (isLoginForm) {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { 'Content-Type': 'application/json' });
        auth.login(responseData.user, responseData.token);
      } catch (error) {
        let formType = 'login';
        handleFetchResponse(formType);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('image', formState.inputs.imageUrl.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}users/signup`,
          'POST',
          formData
        );

        auth.login(responseData.user, responseData.token);
      } catch (error) {
        let formType = 'signup';
        handleFetchResponse(formType);
      }
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && (
          <LoadingSpinner asOverlay />
        )}
        <h2>Authentication Required</h2>
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
          {!isLoginForm
            && (
            <ImageUpload
              id="imageUrl"
              onInput={inputChange}
              center
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorMessage="Please enter a valid password, at least 6 characters."
            onInput={inputChange}
          />
          {hasLoginError === true && (
            <div className="form-control--invalid">
              <p>Invalid e-mail address and/or password</p>
            </div>
          )}
          {hasSignupError === true && (
            <div className="form-control--invalid">
              <p>E-mail address already registered, please login instead</p>
            </div>
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginForm ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <hr />
        <Button inverse onClick={switchForm}>
          {isLoginForm ? 'Signup Instead' : 'Login Instead'}
        </Button>
      </Card>
    </>
  );
};

export default Authentication;
