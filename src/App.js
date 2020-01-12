import React, { Suspense, lazy, useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch
} from 'react-router-dom';

import MainNav from './shared/components/Navigation/MainNav';
import { AuthenticationContext } from './shared/context/authentication-context';
import LoadingSpinner from './shared/components/UIElements/loadingSpinner/LoadingSpinner';

const Users = lazy(() => import('./user/pages/Users'));
const Places = lazy(() => import('./places/pages/Places'));
const AddNewPlace = lazy(() => import('./places/pages/AddNewPlace/AddNewPlace'));
const EditPlace = lazy(() => import('./places/pages/EditPlace/EditPlace'));
const Authentication = lazy(() => import('./user/pages/Authentication'));

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    const tokenExpirationTime = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationTime);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationTime.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTokenTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTokenTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;

  if (token) {
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
        <Route path="/places/:placeId">
          <EditPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
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
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout
      }}
    >
      <Router>
        <MainNav />
        <main>
          <Suspense fallback={
            <div className="center">
              <LoadingSpinner />
            </div>}
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthenticationContext.Provider>
  );
};

export default App;
