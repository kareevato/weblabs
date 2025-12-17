import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="top-bar">
        <p>{location.pathname === '/catalog' ? 'Catalog Page' : 'Home page'}</p>
      </div>
      <nav className="nav">
        <Link to="/" className="logo-placeholder">
          LOGO
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            className={`nav-link ${isActive('/catalog') ? 'active' : ''}`}
          >
            Catalog
          </Link>
          <Link 
            to="/cart" 
            className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
          >
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}
