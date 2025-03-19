import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Computers', 'Smartphones', 'TV & Monitors', 'Gaming Equipment', 'Headphones', 'Speakers', 'Accessories']
  },
  inStock: {
    type: Boolean,
    default: true
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  reviewDetails: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  discount: {
    type: Number,
    min: 0,
    max: 100
  },
  // Computer specific attributes
  processor: String,
  ram: String,
  storage: String,
  graphics: String,

  // Smartphone specific attributes
  screenSize: String,
  camera: String,
  battery: String,
  brand: String,

  // TV/Monitor specific attributes
  resolution: String,
  refreshRate: String,
  connectivity: [String],

  // Gaming Equipment specific attributes
  equipmentType: {
    type: String,
    enum: ['Console', 'Controller', 'Accessory']
  },
  compatibility: [String],
  features: [String],

  // Headphone specific attributes
  headphoneType: {
    type: String,
    enum: ['Wireless', 'Wired']
  },

  // Speaker specific attributes
  speakerType: {
    type: String,
    enum: ['Portable', 'Home', 'Professional']
  },
  power: String,

  // Accessory specific attributes
  compatibleWith: [String],
  accessoryType: String
}, {
  timestamps: true
});

// Index for search optimization
productSchema.index({ name: 'text', description: 'text' });

// Method to calculate final price after discount
productSchema.methods.getFinalPrice = function() {
  if (!this.discount) return this.price;
  return this.price * (1 - this.discount / 100);
};

// Virtual for number of reviews
productSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

// Pre-save middleware to update rating
productSchema.pre('save', function(next) {
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = totalRating / this.reviews.length;
  }
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;