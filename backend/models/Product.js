const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    default: 'mobile'
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  brand: {
    type: String,
    default: ''
  },
  storage: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);