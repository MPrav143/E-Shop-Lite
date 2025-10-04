import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartItemsCount } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          E-Shop Lite
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/cart">
              Cart
              {getCartItemsCount() > 0 && (
                <span className="cart-count">{getCartItemsCount()}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;