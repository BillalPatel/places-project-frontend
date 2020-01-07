import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthenticationContext } from '../../context/authentication-context';
import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthenticationContext);

  return (
    <ul className="nav-links">
      <NavLink to="/users" exact>
        All Users
      </NavLink>
      {auth.isLoggedIn && (
        <NavLink to={`/${auth.userId}/places`}>
          My Places
        </NavLink>
      )}
      {auth.isLoggedIn && (
      <NavLink to="/places/new">
        Add Place
      </NavLink>
      )}
      {!auth.isLoggedIn && (
      <NavLink to="/auth">
        Authenticate
      </NavLink>
      )}
      {auth.isLoggedIn && (
        <button onClick={auth.logout}>Logout</button>
      )}
    </ul>
  );
};

export default NavLinks;
