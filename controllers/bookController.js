const { default: mongoose } = require("mongoose");
const Book = require("../models/book.model");
const Review = require("../models/review.model");

const addNewBook = async (req, res) => {
  try {
    const { name, author, genre } = req.body;
    if (!name || !author || !genre) {
      return res.status(400).json({
        success: false,
        message: "required fields not found",
      });
    }
    const newBook = new Book({
      name: name,
      author: author,
      genre: genre,
    });
    await newBook.save();
    return res.status(200).json({
      success: true,
      message: "Book saved successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error please try again",
      error: error.message,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const { page, author, genre } = req.query;
    const pageCount = parseInt(page) || 1;
    const limit = 10;
    const skip = (pageCount - 1) * limit;

    let filter = {};

    if (author && genre) {
      filter = {
        $or: [
          { author: { $regex: author, $options: "i" } },
          { genre: { $regex: genre, $options: "i" } },
        ],
      };
    } else if (author) {
      filter = { author: { $regex: author, $options: "i" } };
    } else if (genre) {
      filter = { genre: { $regex: genre, $options: "i" } };
    }

    const books = await Book.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      message: "Fetched successfully",
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error, please try again",
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id not found please try again",
      });
    }

    const bookDetails = await Book.findById(id);
    if (!bookDetails) {
      return res.status(400).json({
        success: false,
        message: "Book not found",
      });
    }

    const avgRating = await Review.aggregate([
      { $match: { bookId: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: $bookId,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    const ratingAggregation = avgRating[0]?.averageRating || 0;

    const reviews = await Review.find({ bookId: id }).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      bookDetails,
      averageRating: ratingAggregation.toFxied(2),
      reviews,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: err.message,
    });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { title, author } = req.query;
    if (!title && !author) {
      return res.status(400).json({
        success: false,
        message: "neither title nor author found",
      });
    }

    let filter = {};

    if (author && title) {
      filter = {
        $or: [
          { author: { $regex: author, $options: "i" } },
          { name: { $regex: title, $options: "i" } },
        ],
      };
    } else if (author) {
      filter = { author: { $regex: author, $options: "i" } };
    } else if (title) {
      filter = { name: { $regex: title, $options: "i" } };
    }
    console.log({ filter });
    const books = await Book.find(filter);

    res.status(200).json({
      success: true,
      message: "books serached",
      books: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { addNewBook, getBooks, getBookById, searchBooks };
