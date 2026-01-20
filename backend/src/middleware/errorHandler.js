function errorHandler(err, req, res, next) {
    console.error(err);
  
    const status = err.statusCode || 500;
    const message = err.message || "Server error";
  
    res.status(status).json({
      message,
      ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
  }
  
  module.exports = { errorHandler };
  