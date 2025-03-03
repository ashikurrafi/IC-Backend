const express = require("express"); // Importing express to create the API router

const { userRegister, userLogin } = require("../controllers/userControllers");
const router = express.Router(); // Creating an instance of the router

// Defining a GET route at the root of the /api/user path
router.post("/register", userRegister);
router.post("/login", userLogin);

// Exporting the router so it can be used in other files
module.exports = router;
