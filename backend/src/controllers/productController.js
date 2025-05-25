import Product from "../models/Product.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

// Configure multer for memory storage
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    const responseProducts = products.map((product) => {
      const prod = product.toObject();
      prod.image =
        prod.image.storageType === "cloud"
          ? prod.image.url
          : prod.image.localUrl;
      return prod;
    });
    res.json(responseProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const responseProduct = product.toObject();
    responseProduct.image = responseProduct.image.storageType === "cloud" ? responseProduct.image.url : responseProduct.image.localUrl;
    res.json(responseProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    const responseProducts = products.map((product) => {
      const prod = product.toObject();
      prod.image =
        prod.image.storageType === "cloud"
          ? prod.image.url
          : prod.image.localUrl;
      return prod;
    });
    res.json(responseProducts);
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
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    });
    const responseProducts = products.map((product) => {
      const prod = product.toObject();
      prod.image =
        prod.image.storageType === "cloud"
          ? prod.image.url
          : prod.image.localUrl;
      return prod;
    });
    res.json(responseProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    if (!req.file && !req.body.imageUrl) {
      return res.status(400).json({ message: "Either image file or image URL required" });
    }

    let imageData = {};

    if (req.file) {
      const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "electronic-zone/products",
          format: "webp",
          quality: 80,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });
    const result = await uploadPromise;

    imageData = {
          url: result.secure_url,
          public_id: result.public_id,
          storageType: "cloud",
        };
      } else {
        if (!req.body.imageUrl?.match(/^https?:\/\//)) {
          return res.status(400).json({ message: "Invalid image URL format" });
        }
        imageData = {
          storageType: "local",
          localUrl: req.body.imageUrl
        };
      }

      const productData = {
        ...req.body,
        image: imageData,
      };

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    const responseProduct = savedProduct.toObject();
    responseProduct.image =
      savedProduct.image.storageType === "cloud"
        ? savedProduct.image.url
        : savedProduct.image.localUrl;
    res.status(201).json(responseProduct);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from Cloudinary
    if (product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
