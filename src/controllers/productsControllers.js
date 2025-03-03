const Product = require("../models/productsModels");
const apiError = require("../error/apiError");
const apiResponse = require("../error/apiResponse");
const asyncHandler = require("../error/asyncHandler");

const addNewProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;
    const product = new Product({ name, price, category, stock, description });
    await product.save();
    const response = new apiResponse(
      201,
      product,
      "Product added successfully"
    );
    res.status(201).json(response);
  } catch (error) {
    throw new apiError(400, "Invalid request");
  }
});

const getAllPProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      throw new apiError(404, "No products found");
    }
    const response = new apiResponse(
      200,
      products,
      "Products fetched successfully"
    );
    res.status(200).json(response);
  } catch (error) {
    throw new apiError(400, "Invalid request");
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new apiError(404, "Product not found");
    }
    const response = new apiResponse(
      200,
      product,
      "Product found successfully"
    );
    res.status(200).json(response);
  } catch (error) {
    throw new apiError(400, "Invalid request");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, stock, description },
      { new: true }
    );
    if (!product) {
      throw new apiError(404, "Product not found");
    }
    const response = new apiResponse(
      200,
      product,
      "Product updated successfully"
    );
    res.status(200).json(response);
  } catch (error) {
    throw new apiError(400, "Invalid request");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new apiError(404, "Product not found");
    }
    const response = new apiResponse(200, null, "Product deleted successfully");
    res.status(200).json(response);
  } catch (error) {
    throw new apiError(400, "Invalid request");
  }
});

module.exports = {
  addNewProduct,
  getAllPProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
