const express = require("express");
const Review = require("../models/review.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, userId } = req.user;
    const { description, rating } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id not found",
      });
    }

    const existingReview = await Review.findOne({ bookId: id, userId: userId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "Review already exists",
      });
    }

    const review = new Review({
      bookId: id,
      userId: userId,
      review: description,
      rating: rating,
    });
    await review.save();

    res.status(200).json({
      success: false,
      message: "review submited successfully",
      review,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error please try again",
    });
  }
};

const updatedReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, rating } = req.body;
    const { userId } = req.user;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id not found",
      });
    }

    const rev = await Review.findById(id);

    if (!rev) {
      return res.status(400).json({
        success: false,
        message: "review not found",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(id, {
      $set: { review: description, rating: rating },
    });

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server please try again",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id not found",
      });
    }
    const rev = await Review.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "review deleted successfully",
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

module.exports = { deleteReview, addReview, updatedReview };
