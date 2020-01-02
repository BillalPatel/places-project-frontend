import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch
} from 'react-router-dom';

import MainNav from './shared/components/Navigation/MainNav';
import Users from './user/pages/Users';
import Places from './places/pages/Places';
import AddNewPlace from './places/pages/AddNewPlace/AddNewPlace';
import EditPlace from './places/pages/EditPlace/EditPlace';

const App = () => (
  <Router>
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
        <Route path="/places/:placeId" exact>
          <EditPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    </main>
  </Router>
);

export default App;
