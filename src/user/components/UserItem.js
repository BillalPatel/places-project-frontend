import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/avatar/Avatar';
import Card from '../../shared/components/UIElements/card/Card';
import './UserItem.css';

const UserItem = (props) => {
  const {
    id, image, name, numberOfPlaces,
  } = props;
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {numberOfPlaces}
              {' '}
              {numberOfPlaces === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};
export default UserItem;
