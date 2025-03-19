import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentInfo: {
    method: {
      type: String,
      required: true,
      enum: ['credit_card', 'paypal', 'stripe']
    },
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    amount: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  trackingNumber: String,
  notes: String,
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  refund: {
    status: {
      type: String,
      enum: ['none', 'requested', 'approved', 'processed'],
      default: 'none'
    },
    amount: Number,
    reason: String,
    processedAt: Date
  }
}, {
  timestamps: true
});

// Calculate totals before saving
orderSchema.pre('save', function(next) {
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const discountAmount = itemTotal * (item.discount / 100);
    return sum + (itemTotal - discountAmount);
  }, 0);

  // Calculate tax (assuming 10% tax rate)
  this.tax = this.subtotal * 0.10;

  // Calculate total
  this.total = this.subtotal + this.tax + this.shippingCost;

  next();
});

// Method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  return ['pending', 'processing'].includes(this.status);
};

// Method to check if order can be refunded
orderSchema.methods.canBeRefunded = function() {
  return this.status === 'delivered' && 
         ['none', 'requested'].includes(this.refund.status) &&
         Date.now() - this.updatedAt.getTime() <= 30 * 24 * 60 * 60 * 1000; // 30 days
};

const Order = mongoose.model('Order', orderSchema);

export default Order;