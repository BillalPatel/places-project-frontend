import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch
} from 'react-router-dom';

import MainNav from './shared/components/Navigation/MainNav';
import Users from './user/pages/Users';
import Places from './places/pages/Places';
import AddNewPlace from './places/pages/AddNewPlace/AddNewPlace';
import EditPlace from './places/pages/EditPlace/EditPlace';
import Authentication from './user/pages/Authentication';
import { AuthenticationContext } from './shared/context/authentication-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Places />
        </Route>
        <Route path="/places/new" exact>
          <AddNewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <EditPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Places />
        </Route>
        <Route path="/auth">
          <Authentication />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        userId,
        login,
        logout
      }}
    >
      <Router>
        <MainNav />
        <main>
          {routes}
        </main>
      </Router>
    </AuthenticationContext.Provider>
  );
};

export default App;
