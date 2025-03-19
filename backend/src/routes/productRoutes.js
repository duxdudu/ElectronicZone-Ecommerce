import express from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product.js';
import { getAllProducts, getProductById, getProductsByCategory, searchProducts, createProduct } from '../controllers/productController.js';

const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Only .jpeg, .png and .svg format allowed!');
      error.code = 'INVALID_FILE_TYPE';
      return cb(error, false);
    }
    cb(null, true);
  }
});

// Get all products
router.get('/', getAllProducts);

// Search products
router.get('/search', searchProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Get a single product by ID
router.get('/:id', getProductById);

// Create a new product
router.post('/', upload.single('image'), createProduct);

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;