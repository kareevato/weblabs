import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './header.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path) => location.pathname === path;
  const isCatalog = location.pathname === '/catalog';

  useEffect(() => {
    if (isCatalog) {
      const searchFromUrl = searchParams.get('search') || '';
      setSearchQuery(searchFromUrl);
    }
  }, [location.pathname, searchParams, isCatalog]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/catalog');
    }
  };

  return (
    <header className="header">
      <div className="top-bar">
        <p>{location.pathname === '/catalog' ? 'Catalog Page' : location.pathname.startsWith('/film/') ? 'Item page' : 'Home page'}</p>
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
          {isCatalog && (
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="search-input"
              />
              <button type="submit" className="search-button">🔍</button>
            </form>
          )}
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
