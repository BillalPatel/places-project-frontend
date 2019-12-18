import React from 'react';

import Input from '../../../shared/components/FormElements/input/Input.js';
import {VALIDATOR_REQUIRE} from '../../../shared/utils/validators';
import './AddNewPlace.css';

const AddNewPlace = () => {
    return (
        <form className="place-form">
            <Input 
                element="input" 
                type="text" 
                label="Add a new place" 
                validators={[VALIDATOR_REQUIRE]}
                errorMessage="Please enter a valid title"
            />
        </form>
    )
}

export default AddNewPlace;