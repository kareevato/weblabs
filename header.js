import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navHome, navCatalog, navCart } from '../../services/api';
import './header.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimer = useRef(null);
  const cartItems = useSelector(state => state.items || []);
  
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path) => location.pathname === path;
  const isCatalog = location.pathname === '/catalog';

  useEffect(() => {
    if (isCatalog) {
      const searchFromUrl = searchParams.get('search') || '';
      setSearchQuery(searchFromUrl);
    }
  }, [location.pathname, searchParams, isCatalog]);

  useEffect(() => {
    if (!isCatalog) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    
      const genre = searchParams.get('genre');
      const year = searchParams.get('year');
      const rating = searchParams.get('rating');
      
      if (genre) params.set('genre', genre);
      if (year) params.set('year', year);
      if (rating) params.set('rating', rating);
    
      navigate(`/catalog?${params.toString()}`, { replace: true });
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, isCatalog, navigate, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleNavClick = async (path, navFunction) => {
    try {
      await navFunction();
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      navigate(path);
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
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/', navHome);
            }}
          >
            Home
          </Link>
          <Link 
            to="/catalog" 
            className={`nav-link ${isActive('/catalog') ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/catalog', navCatalog);
            }}
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
            className={`nav-link ${isActive('/cart') ? 'active' : ''} cart-link`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/cart', navCart);
            }}
          >
            Cart
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
