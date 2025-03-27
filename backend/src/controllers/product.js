import Product from "../models/Product.js";
import multer from "multer";
import path from "path";

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG and SVG files are allowed."),
      false
    );
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB limit
  },
  fileFilter: fileFilter,
});

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, status, quantity } = req.body;

    // Validate required fields
    if (!name || !price || !description || !category || !status || !quantity) {
      return res.status(400).json({
        message: "Missing required fields",
        errors: [
          !name && "Product name is required",
          !price && "Product price is required",
          !description && "Product description is required",
          !category && "Product category is required",
          !status && "Product status is required",
          !quantity && "Product quantity is required",
        ].filter(Boolean),
      });
    }

    // Validate image upload
    if (!req.file) {
      return res.status(400).json({
        message: "Missing required fields",
        errors: ["Product image is required"],
      });
    }

    // Validate price and quantity
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity);
    
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: "Invalid price",
        errors: ["Price must be a positive number"],
      });
    }

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({
        message: "Invalid quantity",
        errors: ["Quantity must be a non-negative number"],
      });
    }

    const productData = {
      name: name.trim(),
      price: parsedPrice,
      description,
      category,
      status,
      quantity: parsedQuantity,
      inStock: parsedQuantity > 0,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    };

    const product = new Product(productData);
    await product.save();

    // Return a response that includes the product data
    const responseProduct = product.toObject();
    // Convert buffer to base64 for response
    responseProduct.imageUrl = `data:${responseProduct.image.contentType};base64,${responseProduct.image.data.toString("base64")}`;
    delete responseProduct.image; // Remove the raw image data from response

    res.status(201).json(responseProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const productData = req.body;

    // If a new image was uploaded, update the image data
    if (req.file) {
      productData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
