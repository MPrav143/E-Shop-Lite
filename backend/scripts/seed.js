const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    price: 999,
    stock: 10,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
    description: "6.1-inch Super Retina XDR display, A17 Pro chip, 48MP Main camera",
    brand: "Apple",
    storage: "128GB",
    color: "Natural Titanium"
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    price: 1199,
    stock: 8,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    description: "6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2, 200MP camera",
    brand: "Samsung",
    storage: "256GB",
    color: "Phantom Black"
  },
  {
    name: "Google Pixel 8 Pro",
    price: 999,
    stock: 12,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop",
    description: "6.7-inch Super Actua display, Google Tensor G3, Triple camera system",
    brand: "Google",
    storage: "128GB",
    color: "Obsidian"
  },
  {
    name: "OnePlus 11 5G",
    price: 699,
    stock: 15,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
    description: "6.7-inch Fluid AMOLED, Snapdragon 8 Gen 2, Hasselblad camera",
    brand: "OnePlus",
    storage: "128GB",
    color: "Titan Black"
  },
  {
    name: "Xiaomi 13 Pro",
    price: 899,
    stock: 6,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    description: "6.73-inch LTPO AMOLED, Snapdragon 8 Gen 2, Leica camera system",
    brand: "Xiaomi",
    storage: "256GB",
    color: "Ceramic White"
  },
  {
    name: "Nothing Phone (2)",
    price: 599,
    stock: 20,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
    description: "6.7-inch LTPO OLED, Snapdragon 8+ Gen 1, Glyph interface",
    brand: "Nothing",
    storage: "128GB",
    color: "White"
  },
  {
    name: "Samsung Galaxy Z Flip5",
    price: 999,
    stock: 5,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1621330396173-e1b6d41bffb4?w=400&h=300&fit=crop",
    description: "6.7-inch Main Screen, Snapdragon 8 Gen 2, Flex Window",
    brand: "Samsung",
    storage: "256GB",
    color: "Mint"
  },
  {
    name: "iPhone 14",
    price: 799,
    stock: 18,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=400&h=300&fit=crop",
    description: "6.1-inch Super Retina XDR display, A15 Bionic chip, Advanced dual-camera",
    brand: "Apple",
    storage: "128GB",
    color: "Blue"
  },
  {
    name: "Google Pixel 7a",
    price: 499,
    stock: 25,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop",
    description: "6.1-inch OLED, Google Tensor G2, 64MP camera",
    brand: "Google",
    storage: "128GB",
    color: "Charcoal"
  },
  {
    name: "OnePlus Nord 3 5G",
    price: 449,
    stock: 30,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=400&h=300&fit=crop",
    description: "6.74-inch Fluid AMOLED, Dimensity 9000, 50MP triple camera",
    brand: "OnePlus",
    storage: "128GB",
    color: "Misty Green"
  },
  {
    name: "Motorola Edge 40",
    price: 599,
    stock: 14,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop",
    description: "6.55-inch pOLED, Dimensity 8020, 50MP camera with OIS",
    brand: "Motorola",
    storage: "256GB",
    color: "Nebula Green"
  },
  {
    name: "Samsung Galaxy A54 5G",
    price: 449,
    stock: 22,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
    description: "6.4-inch Super AMOLED, Exynos 1380, Quad camera system",
    brand: "Samsung",
    storage: "128GB",
    color: "Awesome Violet"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully added ${createdProducts.length} products to the database`);

    // Display the created products
    createdProducts.forEach(product => {
      console.log(`- ${product.name} (${product.brand}) - $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();