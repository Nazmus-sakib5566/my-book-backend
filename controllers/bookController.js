const Book = require("../models/Book");

// ============================
// ADD BOOK
// ============================
const addBook = async (req, res) => {
  try {
    const { name, totalPages } = req.body;

    if (!name || !totalPages) {
      return res.status(400).json({
        success: false,
        message: "Book name and total pages are required",
      });
    }

    const pages = Number(totalPages);

    if (isNaN(pages) || pages <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total pages must be a valid number",
      });
    }

    const book = await Book.create({
      name,
      totalPages: pages,
      currentPage: 0,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET ALL BOOKS
// ============================
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({
      createdAt: -1,
    });

    const booksWithProgress = books.map((book) => {
      const percentage = Math.round(
        (book.currentPage / book.totalPages) * 100
      );

      return {
        ...book.toObject(),
        percentage,
      };
    });

    res.status(200).json({
      success: true,
      count: books.length,
      data: booksWithProgress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// GET SINGLE BOOK
// ============================
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const percentage = Math.round(
      (book.currentPage / book.totalPages) * 100
    );

    res.status(200).json({
      success: true,
      data: {
        ...book.toObject(),
        percentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// UPDATE CURRENT PAGE
// ============================
const updatePage = async (req, res) => {
  try {
    const { currentPage } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const page = Number(currentPage);

    if (isNaN(page)) {
      return res.status(400).json({
        success: false,
        message: "Current page must be a number",
      });
    }

    if (page < 0) {
      return res.status(400).json({
        success: false,
        message: "Page cannot be less than 0",
      });
    }

    if (page > book.totalPages) {
      return res.status(400).json({
        success: false,
        message: `Page cannot be greater than ${book.totalPages}`,
      });
    }

    book.currentPage = page;

    await book.save();

    const percentage = Math.round(
      (book.currentPage / book.totalPages) * 100
    );

    res.status(200).json({
      success: true,
      message: "Reading progress updated",
      data: {
        ...book.toObject(),
        percentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// DELETE BOOK
// ============================
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  updatePage,
  deleteBook,
};