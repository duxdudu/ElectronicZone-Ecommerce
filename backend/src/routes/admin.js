import express from "express";

const router = express.Router();


// Admin dashboard route
router.get("/dashboard", async (req, res) => {
  try {
    res.status(200).json({ message: "Admin dashboard data" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

// Product management routes
router.post("/products", async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
});

export default router;
