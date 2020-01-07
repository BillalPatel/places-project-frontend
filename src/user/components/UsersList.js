import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/card/Card';
import './UsersList.css';

const UsersList = (props) => {
  const { items } = props;
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          imageUrl={user.imageUrl}
          numberOfPlaces={user.places === true && user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
