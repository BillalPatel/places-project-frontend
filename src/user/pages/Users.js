import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/loadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/modal/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = async () => {
  const {
    isLoading, error, sendRequest, clearError
  } = useHttpClient();
  const [allUsers, setAllUsers] = useState();

  await useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');

        setAllUsers(responseData.users);
      } catch (error) {}
    };
    getUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
