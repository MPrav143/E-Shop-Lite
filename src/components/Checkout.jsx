import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: cart.items,
        customer: customer,
        subtotal: getCartTotal()
      };

      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      
      setOrderId(response.data.orderId);
      setOrderConfirmed(true);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="order-confirmation">
        <div className="success-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase, {customer.name}!</p>
        <p>Your order ID is: <strong>{orderId}</strong></p>
        <p>We've sent a confirmation email to {customer.email}</p>
        <a href="/" className="checkout-btn" style={{display: 'inline-block', marginTop: '1rem'}}>
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>
      <div className="checkout-form">
        <h2>Order Summary</h2>
        {cart.items.map(item => (
          <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>{item.name} x {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #ecf0f1', paddingTop: '1rem', marginTop: '1rem' }}>
          <strong>Total: ${getCartTotal().toFixed(2)}</strong>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          <h2>Customer Information</h2>
          {error && <div className="error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <button
            type="submit"
            className="submit-btn"
            disabled={loading || cart.items.length === 0}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;