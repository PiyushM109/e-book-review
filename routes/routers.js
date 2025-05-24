const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/authController");
const {
  addNewBook,
  getBooks,
  getBookById,
  searchBooks,
} = require("../controllers/bookController");
const {
  deleteReview,
  addReview,
  updatedReview,
} = require("../controllers/reviewController");
const verifyToken = require("../middleware/middleware");

router.post("/signup", signUp);
router.post("/login", login);

router.post("/books", verifyToken, addNewBook);
router.get("/books", verifyToken, getBooks);
router.get("/books/:id", verifyToken, getBookById);

router.post("/books/:id/reviews", verifyToken, addReview);
router.put("/reviews/:id", verifyToken, updatedReview);
router.delete("/reviews/:id", verifyToken, deleteReview);

router.get("/search", searchBooks);

module.exports = router;
