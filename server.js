const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const port = 4500;

// Replace <password> with your actual password
const uri = "mongodb+srv://abrarabrar:abrarabrar@cluster0.2fxsrn7.mongodb.net/?retryWrites=true&w=majority";

const {
  registerUser,
  login
} = require("./controller/usercontroller");
const menuController = require("./controller/menucontroller");
const isAuthenticated = require("./middleware/authmiddleware");

// Create a new menu
app.post("/", menuController.createMenu);

// Get a menu by ID
app.get("/:id", menuController.getMenuById);

// Get all menus
app.get("/", isAuthenticated, menuController.getAllMenus);

// Update a menu by ID
app.put("/:id", menuController.updateMenu);

// Delete a menu by ID
app.delete("/:id", menuController.deleteMenu);

// Register a new user
app.post("/register", registerUser);

// Login
app.post("/login", login);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
