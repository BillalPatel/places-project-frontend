import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/input/Input';
import Button from '../../../shared/components/FormElements/button/Button';
import { useForm } from '../../../shared/hooks/form';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';
import '../AddNewPlace/PlaceForm.css';

const dummyPlaces = [ // Will replace with API data
  {
    id: '123',
    title: 'Istanbul',
    description: 'Hagia Sophia',
    address: 'Sultan Ahmet, Ayasofya Meydanı, 34122 Fatih/İstanbul, Turkey',
    imageUrl: 'http://i.hurimg.com/i/hdn/75/0x0/5c0d246dc03c0e15a49c546a.jpg',
    creatorId: 'user1',
    location: {
      lat: 41.008583,
      lng: 28.9779863
    }
  }
];

const EditPlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { placeId } = useParams();

  const place = dummyPlaces.find((el) => el.id === placeId);

  const [formState, inputChange, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    if (place) {
      setFormData({
        title: {
          value: place.title,
          isValid: true
        },
        description: {
          value: place.description,
          isValid: true
        }
      },
      true);
    }
    setIsLoading(false);
  }, [setFormData, place]);

  const submitEditNewPlace = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Replace with backend
  };

  if (!place) {
    return (
      <div className="center">
        <h2>Place not found</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!formState.inputs.title.value) {
    return (
      <div className="center">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={submitEditNewPlace}>
      <h2>Edit Place</h2>
      <Input
        id="title"
        elementType="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Please enter a valid title"
        onInput={inputChange}
        initialValue={formState.inputs.title.value}
        initiallyValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        elementType="textarea"
        label="Description"
        rows="2"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorMessage="Please enter a valid description"
        onInput={inputChange}
        initialValue={formState.inputs.description.value}
        initiallyValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
          Edit Place
      </Button>
    </form>
  );
};

export default EditPlace;
