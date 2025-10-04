import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty</p>
        <Link to="/" className="checkout-btn" style={{display: 'inline-block', marginTop: '1rem'}}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.items.map(item => (
        <div key={item.productId} className="cart-item">
          <div className="cart-item-info">
            <h4>{item.name}</h4>
            <p className="cart-item-price">${item.price} each</p>
          </div>
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => updateQuantity(item.productId, item.qty - 1)}
            >
              -
            </button>
            <span className="quantity-display">{item.qty}</span>
            <button
              className="quantity-btn"
              onClick={() => updateQuantity(item.productId, item.qty + 1)}
            >
              +
            </button>
          </div>
          <div>
            <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
          </div>
          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.productId)}
          >
            Remove
          </button>
        </div>
      ))}
      
      <div className="cart-summary">
        <div className="cart-total">
          Total: ${getCartTotal().toFixed(2)}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
          <button
            className="remove-btn"
            onClick={clearCart}
            style={{ backgroundColor: '#95a5a6' }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;