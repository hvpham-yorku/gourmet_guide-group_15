import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (

<nav className="navbar">
<div className="navbar-left">
<a>Wow</a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/Home">Home</a>
      </li>
      <li>
        <a href="/search">Search</a>
      </li>
      <li>
        <a href="/database">Recipes</a>
      </li>
      <li> 
        <a href="/AI">AI Chef</a>
      </li>
    </ul>
  </div>
  <div className="navbar-right">
    <a href="/cart" className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      <span className="cart-count">90</span>
    </a>
    <a href="/account" className="user-icon">
      <i className="fas fa-user"></i>
    </a>
  </div>
</nav>
);
};

export default Navbar;