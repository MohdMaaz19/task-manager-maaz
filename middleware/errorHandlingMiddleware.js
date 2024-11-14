// middleware/errorHandlingMiddleware.js

const errorHandlingMiddleware = (err, req, res, next) => {
    // Set default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    // Log the error (optional, for debugging)
    console.error(err);
  
    // Send standardized JSON response
    res.status(statusCode).json({
      success: false,
      error: {
        message,
      },
    });
  };
  
  export default errorHandlingMiddleware;
  