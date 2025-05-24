const express = require("express");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token not found",
      });
    }
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRETE);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;
