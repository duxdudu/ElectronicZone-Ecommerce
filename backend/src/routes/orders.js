import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orders.js';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Get a specific order
router.get('/:id', getOrderById);

// Update an order
router.put('/:id', updateOrder);

// Delete an order
router.delete('/:id', deleteOrder);

export default router;