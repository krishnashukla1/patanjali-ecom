import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart, totalPrice, setView }) => {
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">Your Cart</h2>
        <p>Your cart is empty.</p>
        <button className="back-btn" onClick={() => setView('products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h3 className="cart-item-name">{item.name}</h3>
            <p className="cart-item-price">₹{item.price}</p>
            <div className="cart-item-quantity">
              <button 
                className="quantity-btn" 
                onClick={() => updateQuantity(item.id, -1)}
              >
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => updateQuantity(item.id, 1)}
              >
                +
              </button>
              <button 
                className="remove-btn" 
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="cart-summary">
        <div className="total-price">Total: ₹{totalPrice}</div>
        <button className="back-btn" onClick={() => setView('products')}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={() => setView('checkout')}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;