import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/input/Input';
import Button from '../../shared/components/FormElements/button/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validators';

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
      lng: 28.9779863,
    },
  },
];

const EditPlace = () => {
  const placeId = useParams().placeId;
  const place = dummyPlaces.find(el => el.id === placeId);

  if (!place) {
    return (
      <div className="center">
        <h2>Not found </h2>
      </div>
    );
  }

  return (
    <form>
      <h2>Edit Place</h2>
      <Input />
      <Button />
    </form>
  );
};

export default EditPlace;
