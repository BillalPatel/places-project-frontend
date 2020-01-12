import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/loadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/modal/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http';

const Users = () => {
  const {
    isLoading, error, sendRequest, clearError
  } = useHttpClient();
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}users`);
        setAllUsers(responseData.users);
      } catch (error) {}
    };
    fetchUsers();
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
