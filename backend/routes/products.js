const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/products - Add new product
router.post('/', async (req, res) => {
  try {
    const { name, price, stock, category, image } = req.body;
    
    const product = new Product({
      name,
      price,
      stock,
      category,
      image
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;