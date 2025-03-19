import Product from '../models/Product.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, status, quantity } = req.body;

    // Validate required fields
    if (!name || !price || !category || !status || !quantity) {
      return res.status(400).json({
        message: 'Missing required fields',
        errors: [
          !name && 'Product name is required',
          !price && 'Product price is required',
          !category && 'Product category is required',
          !status && 'Product status is required',
          !quantity && 'Product quantity is required'
        ].filter(Boolean)
      });
    }

    // Validate category enum
    const validCategories = ['Computers', 'Smartphones', 'TV & Monitors', 'Gaming Equipment', 'Headphones', 'Speakers', 'Accessories'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: 'Invalid category',
        errors: [`Category must be one of: ${validCategories.join(', ')}`]
      });
    }

    // Validate price
    if (price < 0) {
      return res.status(400).json({
        message: 'Invalid price',
        errors: ['Price cannot be negative']
      });
    }

    // Get the image path if a file was uploaded
    const imagePath = req.file ? `/uploads/${req.file.originalname}` : null;

    const newProduct = new Product({
      name: name.trim(),
      price: parseFloat(price),
      description: description || '',
      image: imagePath,
      category,
      status,
      quantity: parseInt(quantity),
      inStock: parseInt(quantity) > 0,
      rating: 0,
      reviews: 0,
      reviewDetails: []
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: error.message });
  }
};