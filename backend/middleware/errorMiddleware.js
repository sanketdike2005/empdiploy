export const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: err.errors?.[0]?.message || "Duplicate value",
    });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: err.errors?.map((e) => e.message).join(", ") || "Validation error",
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
};
