import React from "react";
import './header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="top-bar">
        <p>Home page</p>
      </div>
      <nav className="nav">
        <div className="logo-placeholder">LOGO</div>
        <div className="nav-links">
          <span className="nav-link active">Home</span>
          <span className="nav-link" style={{opacity: 0.5}}>Catalog</span>
          <span className="nav-link" style={{opacity: 0.5}}>Cart</span>
        </div>
      </nav>
    </header>
  );
}


