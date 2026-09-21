const express = require("express");

const {
  addBook,
  getBooks,
  getBook,
  updatePage,
  deleteBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add book
router.post("/",authMiddleware, addBook);

// Get all books
router.get("/",authMiddleware, getBooks);

// Get single book
router.get("/:id",authMiddleware, getBook);

// Update reading page
router.patch("/:id/page",authMiddleware, updatePage);

// Delete book
router.delete("/:id",authMiddleware, deleteBook);

module.exports = router;