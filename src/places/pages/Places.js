import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const Places = () => {
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

  const { userId } = useParams();
  const servedPlaces = dummyPlaces.filter((place) => place.creatorId === userId);
  return (
    <PlaceList items={servedPlaces} />
  );
};

export default Places;
