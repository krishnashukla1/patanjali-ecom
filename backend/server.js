
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Read products from JSON file
const productsPath = path.join(__dirname, 'products.json');

// Helper function to read products
const readProducts = () => {
  try {
    const data = fs.readFileSync(productsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
};

// Helper function to write products
const writeProducts = (products) => {
  try {
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing products:', error);
    return false;
  }
};

// Routes
// Get all products
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Search products
app.get('/api/products/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const products = readProducts();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
  res.json(filteredProducts);
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const products = readProducts();
  const filteredProducts = products.filter(product => 
    product.category.toLowerCase() === category
  );
  res.json(filteredProducts);
});

// Add to cart (simplified - in a real app, this would manage user sessions)
app.post('/api/cart', (req, res) => {
  // This is a simplified implementation
  // In a real application, you would manage user sessions and store cart data
  res.json({ message: 'Product added to cart (simulated)' });
});

// Checkout (simplified)
app.post('/api/checkout', (req, res) => {
  // This would process the order in a real application
  res.json({ 
    message: 'Order placed successfully (simulated)', 
    orderId: Math.floor(Math.random() * 1000000) 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});