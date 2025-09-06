import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import API_URL from './api';   // ⬅️ import API URL
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    alert(`Order placed successfully! Total: ₹${getTotalPrice()}`);
    setCart([]);
    setView('products');
  };

  return (
    <div className="App">
      <Header 
        cartCount={getCartCount()} 
        setView={setView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="container">
        {view === 'products' && (
          <ProductList 
            products={products} 
            addToCart={addToCart} 
            searchQuery={searchQuery}
          />
        )}
        
        {view === 'cart' && (
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            totalPrice={getTotalPrice()}
            setView={setView}
          />
        )}
        
        {view === 'checkout' && (
          <Checkout 
            cart={cart}
            totalPrice={getTotalPrice()}
            handleCheckout={handleCheckout}
            setView={setView}
          />
        )}
      </div>
    </div>
  );
}

export default App;
