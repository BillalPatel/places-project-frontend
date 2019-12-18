import React, {useCallback, useReducer} from 'react';

import Input from '../../../shared/components/FormElements/input/Input.js';
import Button from '../../../shared/components/FormElements/button/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../../shared/utils/validators';
import './AddNewPlace.css';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const input in state.inputs) {
                if (input === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[input].isValid
                }
            }
            return {
                ...state,
                input: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value, 
                        isValid: action.isValid
                    },
                    isValid: formIsValid
                }
            };
        default: 
    }
};

const AddNewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    })
    
    const inputChange = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE', inputId: id, value: value, isValid: isValid
        })
    }, [dispatch]);

    return (
        <form className="place-form">
            <Input 
                id="title"
                el="input" 
                type="text"
                label="Title" 
                validators={[VALIDATOR_REQUIRE]}
                errorMessage="Please enter a valid title"
                onInput={inputChange}
            />
            <Input 
                id="description"
                el="textarea" 
                label="Description" 
                validators={[VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH(5)]}
                errorMessage="Please enter a valid description"
                onInput={inputChange}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Add Place
            </Button>
        </form>
    )
}

export default AddNewPlace;