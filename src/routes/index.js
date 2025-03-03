const express = require("express"); // Importing required modules
const productRouter = require("./productRoutes"); // Importing the router for the API endpoints
const userRouter = require("./userRoutes"); // Importing the router for the API endpoints

const router = express.Router(); // Creating an instance of the router

router.use("/api", productRouter); // Defining a route to handle requests to /api
router.use("/api", userRouter); // Defining a route to handle requests to /api

module.exports = router; // Exporting the router so it can be used in other files
