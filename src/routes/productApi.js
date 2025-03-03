const express = require("express"); // Importing express to create the API router
const {
  addNewProduct,
  getAllPProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsControllers");
const router = express.Router(); // Creating an instance of the router

// Defining a GET route at the root of the /api/products path
router.post("/products", addNewProduct);
router.get("/products", getAllPProduct);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Exporting the router so it can be used in other files
module.exports = router;
