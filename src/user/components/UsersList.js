import React from 'react';

import UserItem from './UserItem';
import './UserList.css'

const UsersList = (props) => {
    if (!props.items) {
        return (
            <div className="center">
                <h2>No users found.</h2>
            </div>
        )
    } else {
        return (
            <ul>
                {props.items.map(user => (
                    <UserItem 
                        key={user.id}
                        id={user.id}
                        name={user.name} 
                        image={user.image}
                        places={user.places}
                    />
                ))}
            </ul>
        )
    }
    
    
}

export default UsersList;