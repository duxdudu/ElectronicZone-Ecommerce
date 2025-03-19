import Order from '../models/Order.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentInfo,
      user,
      shippingCost,
      deliveryOption
    } = req.body;

    // Calculate subtotal from items
    const subtotal = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Calculate tax (6.8% as per the frontend)
    const tax = subtotal * 0.068;

    // Create new order
    const order = new Order({
      user: user,
      items: items.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress: {
        street: `${shippingAddress.houseNo}, ${shippingAddress.address}`,
        city: shippingAddress.sector,
        state: shippingAddress.cell,
        zipCode: shippingAddress.postalCode,
        country: 'Rwanda' // Default as per frontend
      },
      paymentInfo: {
        method: paymentInfo.method,
        status: 'pending',
        amount: subtotal + tax + shippingCost
      },
      status: 'pending',
      subtotal: subtotal,
      tax: tax,
      shippingCost: shippingCost,
      total: subtotal + tax + shippingCost
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// Get a specific order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};