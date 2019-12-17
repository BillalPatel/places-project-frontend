import React from 'react';

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
        long: 28.9779863
      }
    }
  ]
  return (
    <PlaceList items={dummyPlaces}/>
  )
}

export default Places;