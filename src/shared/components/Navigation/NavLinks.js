import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = () => (
  <ul className="nav-links">
    <NavLink to="/users" exact>
                All Users
    </NavLink>
    <NavLink to="/user1/places">
                My Places
    </NavLink>
    <NavLink to="/places/new">
                Add Place
    </NavLink>
    <NavLink to="/auth">
                Authenticate
    </NavLink>
  </ul>
);

export default NavLinks;
