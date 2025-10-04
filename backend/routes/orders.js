const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { items, customer } = req.body;

    // Calculate subtotal and validate products
    let subtotal = 0;
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.productId}` });
      }
      if (product.stock < item.qty) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }
      subtotal += product.price * item.qty;
      
      // Update product stock
      product.stock -= item.qty;
      await product.save();
    }

    const order = new Order({
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        qty: item.qty
      })),
      subtotal,
      customer,
      status: 'confirmed'
    });

    const savedOrder = await order.save();
    res.status(201).json({
      message: 'Order created successfully',
      orderId: savedOrder._id,
      order: savedOrder
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/orders/:id - Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;