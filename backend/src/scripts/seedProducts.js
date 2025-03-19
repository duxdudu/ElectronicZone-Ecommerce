import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  // Computers
  {
    name: 'Pro Gaming Desktop',
    price: 1499.99,
    description: 'High-performance gaming desktop with RGB lighting',
    image: '/Headphones-Earbuds.jpg',
    category: 'Computers',
    inStock: true,
    processor: 'Intel Core i9-12900K',
    ram: '32GB DDR4',
    storage: '2TB NVMe SSD',
    graphics: 'NVIDIA RTX 4080 16GB',
    rating: 4.7,
    reviews: 189
  },
  {
    name: 'Business Laptop',
    price: 999.99,
    description: 'Lightweight and powerful business laptop',
    image: '/Business-Laptop.jpeg',
    category: 'Computers',
    inStock: true,
    processor: 'Intel Core i7-1165G7',
    ram: '16GB DDR4',
    storage: '512GB SSD',
    graphics: 'Intel Iris Xe',
    rating: 4.5,
    reviews: 167
  },

  // Smartphones
  {
    name: 'iPhone 15 Pro Max',
    price: 1199.99,
    description: 'Latest flagship iPhone with A17 Pro chip and advanced camera system',
    image: '/iphone-15-pro.avif',
    category: 'Smartphones',
    inStock: true,
    screenSize: '6.7 inches',
    storage: '512GB',
    camera: '48MP + 12MP + 12MP',
    battery: '4422mAh',
    rating: 4.9,
    reviews: 342,
    discount: 50,
    brand: 'Apple'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 1299.99,
    description: 'Premium Android flagship with S Pen and AI features',
    image: '/galaxy-s24.jpg',
    category: 'Smartphones',
    inStock: true,
    screenSize: '6.8 inches',
    storage: '512GB',
    camera: '200MP + 12MP + 10MP + 10MP',
    battery: '5000mAh',
    rating: 4.8,
    reviews: 256,
    brand: 'Samsung'
  },
  {
    name: 'Google Pixel 8 Pro',
    price: 999.99,
    description: 'Google flagship with advanced AI photography',
    image: '/pixel-8.webp',
    category: 'Smartphones',
    inStock: true,
    screenSize: '6.7 inches',
    storage: '256GB',
    camera: '50MP + 48MP + 48MP',
    battery: '5050mAh',
    rating: 4.7,
    reviews: 189,
    brand: 'Google'
  },
  {
    name: 'OnePlus 12',
    price: 899.99,
    description: 'Flagship killer with Snapdragon 8 Gen 3',
    image: '/oneplus-12.jpg',
    category: 'Smartphones',
    inStock: true,
    screenSize: '6.82 inches',
    storage: '256GB',
    camera: '50MP + 48MP + 64MP',
    battery: '5400mAh',
    rating: 4.6,
    reviews: 145,
    brand: 'OnePlus'
  },
  {
    name: 'Nothing Phone 2',
    price: 699.99,
    description: 'Unique design with Glyph interface',
    image: '/nothing-phone.jpg',
    category: 'Smartphones',
    inStock: true,
    screenSize: '6.7 inches',
    storage: '256GB',
    camera: '50MP + 50MP',
    battery: '4700mAh',
    rating: 4.5,
    reviews: 98,
    brand: 'Nothing'
  },

  // TV & Monitors
  {
    name: 'Gaming Monitor Pro',
    price: 699.99,
    description: 'High refresh rate gaming monitor',
    image: '/gaming-monitor.jpg',
    category: 'TV & Monitors',
    inStock: true,
    screenSize: '27 inches',
    resolution: '2560x1440',
    refreshRate: '165Hz',
    connectivity: ['HDMI 2.1', 'DisplayPort 1.4', 'USB-C'],
    rating: 4.6,
    reviews: 142
  },
  {
    name: 'Smart TV 4K',
    price: 899.99,
    description: 'Smart TV with stunning 4K resolution',
    image: '/smart-tv.jpg',
    category: 'TV & Monitors',
    inStock: true,
    screenSize: '55 inches',
    resolution: '3840x2160',
    refreshRate: '120Hz',
    connectivity: ['HDMI 2.1', 'USB', 'Optical', 'Ethernet'],
    rating: 4.7,
    reviews: 189
  },

  // Gaming Equipment
  {
    name: 'Pro Gaming Console',
    price: 499.99,
    description: 'Next-gen gaming console',
    image: '/gaming-console.jpg',
    category: 'Gaming Equipment',
    inStock: true,
    equipmentType: 'Console',
    compatibility: ['4K TV', 'Gaming Headsets', 'Wireless Controllers'],
    features: ['4K Gaming', 'Ray Tracing', 'Quick Resume'],
    rating: 4.8,
    reviews: 245
  },
  {
    name: 'Wireless Controller',
    price: 69.99,
    description: 'Premium wireless gaming controller',
    image: '/Wireless Controller.jpg',
    category: 'Gaming Equipment',
    inStock: true,
    equipmentType: 'Controller',
    compatibility: ['Console', 'PC'],
    features: ['Haptic Feedback', 'Adaptive Triggers', 'Low Latency'],
    rating: 4.6,
    reviews: 158
  },

  // Headphones
  {
    name: 'Pro Gaming Headset',
    price: 199.99,
    description: 'Premium gaming headset with surround sound',
    image: '/Pro-Gaming-Headset.jpg',
    category: 'Headphones',
    inStock: true,
    headphoneType: 'Wireless',
    connectivity: ['Bluetooth 5.0', '2.4GHz Wireless'],
    features: ['7.1 Surround Sound', 'Noise Cancellation', 'RGB Lighting'],
    rating: 4.7,
    reviews: 203
  },
  {
    name: 'Studio Headphones',
    price: 299.99,
    description: 'Professional studio monitoring headphones',
    image: '/studio-headphones.jpg',
    category: 'Headphones',
    inStock: true,
    headphoneType: 'Wired',
    connectivity: ['3.5mm Jack', '6.35mm Adapter'],
    features: ['High Resolution Audio', 'Detachable Cable', 'Foldable Design'],
    rating: 4.8,
    reviews: 156
  },

  // Speakers
  {
    name: 'Portable Bluetooth Speaker',
    price: 129.99,
    description: 'Waterproof portable speaker with great bass',
    image: '/portable-speaker.jpg',
    category: 'Speakers',
    inStock: true,
    speakerType: 'Portable',
    power: '30W',
    connectivity: ['Bluetooth 5.0', 'AUX'],
    rating: 4.5,
    reviews: 75
  },
  {
    name: 'Home Theater System',
    price: 799.99,
    description: '5.1 surround sound system',
    image: '/home-theater.jpg',
    category: 'Speakers',
    inStock: true,
    speakerType: 'Home',
    power: '1000W',
    connectivity: ['HDMI', 'Optical', 'Bluetooth'],
    rating: 4.7,
    reviews: 128
  },

  // Accessories
  {
    name: 'Wireless Charging Pad',
    price: 39.99,
    description: 'Fast wireless charging pad for smartphones',
    image: '/charging-pad.jpg',
    category: 'Accessories',
    inStock: true,
    compatibleWith: ['Smartphones', 'Wireless Earbuds'],
    accessoryType: 'Charging',
    rating: 4.5,
    reviews: 85
  },
  {
    name: 'Gaming Mouse',
    price: 79.99,
    description: 'High-precision gaming mouse with RGB',
    image: '/gaming-mouse.jpg',
    category: 'Accessories',
    inStock: true,
    compatibleWith: ['PC', 'Laptop'],
    accessoryType: 'Input Device',
    rating: 4.6,
    reviews: 92
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing products
    await Product.deleteMany({});
    console.log('Existing products deleted');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length} products inserted successfully`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();