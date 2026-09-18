// Centralized Express error-handling middleware catches errors forward via next(err).

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Server error";

  // Mongoose schema validation failure for a missing field or bad enum
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  //MongoDB duplicate key error
  else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already in use`;
  }

  //Invalid ObjectId format passed in a route param
  else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
