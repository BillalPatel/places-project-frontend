import React, { useContext } from 'react';

import Card from '../../shared/components/UIElements/card/Card';
import Button from '../../shared/components/FormElements/button/Button';
import PlaceItem from './PlaceItem';
import { AuthenticationContext } from '../../shared/context/authentication-context';
import './PlaceList.css';

const PlaceList = (props) => {
  const { items } = props;
  const auth = useContext(AuthenticationContext);

  if (!items || items.length === 0) {
    return (
      <div className="place-list">
        <Card>
          <h2>No places found</h2>
          {auth.userId && (
            <Button to="/places/new">Add Your New Place</Button>
          )}
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
          imageUrl={place.imageUrl}
          creatorId={place.creatorId}
          coordinates={place.location}
          onDeletePlace={props.deletePlaceById}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
