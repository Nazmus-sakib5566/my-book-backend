const express = require("express");

const {
  addBook,
  getBooks,
  getBook,
  updatePage,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// Add book
router.post("/", addBook);

// Get all books
router.get("/", getBooks);

// Get single book
router.get("/:id", getBook);

// Update reading page
router.patch("/:id/page", updatePage);

// Delete book
router.delete("/:id", deleteBook);

module.exports = router;