import React from 'react';

import UsersList from '../components/UsersList'

const Users = () => {
    const dummyUsers = [ // Will replace with API data
        { 
            id: 'user1',
            name: 'Mo Salah',
            image: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg?w968h681',
            numberOfPlaces: 3
        },
        { 
            id: 'user2',
            name: 'Virgil van Dijk',
            image: 'https://cdn.britannica.com/36/162636-050-932C5D49/Colosseum-Rome-Italy.jpg',
            numberOfPlaces: 8
        }
    ]; 
    
    return (
        <UsersList items={dummyUsers} /> 
    )
}

export default Users;