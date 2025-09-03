import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">Café Fausse</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;