import React from 'react';

import Card from '../../shared/components/UIElements/card/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

const PlaceList = (props) => {
  const { items } = props;
  if (items.length === 0) {
    return (
      <div className="place-list-center">
        <Card>
          <h2>No places found</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          description={place.description}
          address={place.address}
          image={place.imageUrl}
          creatorId={place.creatorId}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
