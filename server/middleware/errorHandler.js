const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Structured server-side log — always log full details on the server
  console.error(`[Error] ${req.method} ${req.path} → ${statusCode} ${err.message}`);
  if (!isProduction) {
    console.error(err.stack);
  }

  // Client response — never expose stack traces in production
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: isProduction ? null : (err.stack || null),
  });
};

module.exports = errorHandler;

