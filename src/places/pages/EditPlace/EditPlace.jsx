import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../../shared/components/FormElements/input/Input';
import Button from '../../../shared/components/FormElements/button/Button';
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
  const { placeId } = useParams();
  const place = dummyPlaces.find((el) => el.id === placeId);

  if (!place) {
    return (
      <div className="center">
        <h2>Not found </h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <h2>Edit Place</h2>
      <Input
        id="title"
        elementType="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Please enter a valid title"
        onInput={() => {}}
      />
      <Input
        id="description"
        elementType="textarea"
        label="Description"
        rows="2"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorMessage="Please enter a valid description"
        onInput={() => {}}
        valid="true"
        value=""
      />
      <Input
        id="address"
        elementType="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
        errorMessage="Please enter a valid address"
        onInput={() => {}}
        valid="true"
        value={place.description}
      />
      <Button type="submit" disabled>
        Edit Place
      </Button>
    </form>
  );
};

export default EditPlace;
