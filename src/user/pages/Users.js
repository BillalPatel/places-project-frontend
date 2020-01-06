import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/loadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/modal/ErrorModal';

const Users = async () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [allUsers, setAllUsers] = useState();

  await useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setAllUsers(responseData.users);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const handleError = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={handleError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && allUsers
        && (<UsersList items={allUsers} />)}
    </>
  );
};

export default Users;
