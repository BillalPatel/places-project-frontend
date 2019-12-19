import React from "react";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";

import MainNav from './shared/components/Navigation/MainNav';
import Users from './user/pages/Users';
import AddNewPlace from './places/pages/AddNewPlace/AddNewPlace';
import Places from './places/pages/Places';

const App = () => {
  return (
    <BrowserRouter>
      <MainNav />
      <main>
        <Switch>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <Places />
          </Route>
          <Route path="/places/new" exact>
            <AddNewPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
