import express from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByCategory, upload } from '../controllers/product.js';

const router = express.Router();

// Create a new product with image upload
router.post('/', upload.single('image'), createProduct);

// Get all products
router.get('/', getProducts);

// Get products by category
router.get('/category/:category', getProductsByCategory);

// Get a single product
router.get('/:id', getProduct);

// Update a product
router.put('/:id', upload.single('image'), updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

export default router;