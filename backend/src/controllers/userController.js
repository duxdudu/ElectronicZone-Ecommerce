import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// Create a new customer
export const createCustomer = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  // Check if user with email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User with this email already exists", 400));
  }

  // Create new user with customer role
  const user = await User.create({
    name,
    email,
    phone,
    role: "customer",
  });

  // No need to remove password as it's been removed from the model

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Get all customers
export const getAllCustomers = catchAsync(async (req, res) => {
  const customers = await User.find({ role: "customer" }).sort("-createdAt");

  res.status(200).json({
    status: "success",
    results: customers.length,
    data: {
      customers,
    },
  });
});

// Get customer by ID
export const getCustomerById = catchAsync(async (req, res, next) => {
  const customer = await User.findById(req.params.id);

  if (!customer || customer.role !== "customer") {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
});

// Update customer
export const updateCustomer = catchAsync(async (req, res, next) => {
  const { name, phone } = req.body;

  const customer = await User.findByIdAndUpdate(
    req.params.id,
    { name, phone },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customer || customer.role !== "customer") {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
});