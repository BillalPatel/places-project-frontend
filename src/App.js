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

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Places />
        </Route>
        <Redirect to="/" />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/users" exact>
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
        <Route path="/auth" exacty>
          <Authentication />
        </Route>
        <Redirect to="/auth" />
      </>
    );
  }
  return (
    <AuthenticationContext.Provider value={isLoggedIn, login, logout}>
      <Router>
        <MainNav />
        <main>
          <Switch>
            {routes}
          </Switch>
        </main>
      </Router>
    </AuthenticationContext.Provider>
  );
};

export default App;
