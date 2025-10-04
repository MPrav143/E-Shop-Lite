import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

// Use Vite env variable
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from:', `${API_BASE_URL}/products`);
      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log('Products response:', response.data);
      
      if (response.data && response.data.length > 0) {
        setProducts(response.data);
      } else {
        setError('No products found in the database');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(`Failed to load products: ${err.response?.data?.error || err.message}`);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const refreshProducts = () => {
    setLoading(true);
    setError('');
    fetchProducts();
  };

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading latest mobile phones...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error">
        <h3>Unable to Load Products</h3>
        <p>{error}</p>
        <div className="error-actions">
          <button onClick={refreshProducts} className="retry-btn">
            Try Again
          </button>
          <p className="error-help">
            Make sure your backend server is running on port 5000 and MongoDB is connected.
          </p>
        </div>
      </div>
    </div>
  );

  if (products.length === 0) return (
    <div className="empty-state">
      <div className="empty-icon">📱</div>
      <h2>No Products Available</h2>
      <p>There are no mobile phones in the database yet.</p>
      <button onClick={refreshProducts} className="retry-btn">
        Refresh
      </button>
    </div>
  );

  return (
    <div className="product-list-container">
      <div className="page-header">
        <h1>Latest Mobile Phones</h1>
        <p className="page-subtitle">Discover the best smartphones with cutting-edge technology</p>
        <div className="products-count">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </div>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop';
                }}
              />
              {product.stock < 5 && product.stock > 0 && (
                <span className="low-stock-badge">Low Stock</span>
              )}
              {product.stock === 0 && (
                <span className="out-of-stock-badge">Out of Stock</span>
              )}
            </div>
            
            <div className="product-info">
              <div className="product-brand">{product.brand || 'Mobile'}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">
                {product.description || 'Premium smartphone with advanced features'}
              </p>
              
              <div className="product-specs">
                <div className="spec-item">
                  <span className="spec-label">Storage:</span>
                  <span className="spec-value">{product.storage || '128GB'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Color:</span>
                  <span className="spec-value">{product.color || 'Black'}</span>
                </div>
              </div>
              
              <div className="product-price-section">
                <p className="product-price">${product.price}</p>
                <p className="product-stock">
                  {product.stock > 0 ? 
                    `${product.stock} units available` : 
                    'Temporarily unavailable'
                  }
                </p>
              </div>
              
              <button
                className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;