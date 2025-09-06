import React from 'react';
import patanjaliLogo from '../assets/logo.png'; 

const Header = ({ cartCount, setView, searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="header-content">
        {/* <div className="logo">PATANJALI</div> */}
         <img src={patanjaliLogo} alt="Patanjali Logo" className="logo-img" />
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="cart-icon" onClick={() => setView('cart')}>
          <span>🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;