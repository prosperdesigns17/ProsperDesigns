// Load global process safety handlers FIRST — before any other require
require('./utils/processHandlers');

const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
});

// Graceful shutdown on SIGTERM (sent by process managers / Render / Railway / Docker)
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received — shutting down gracefully...');
  server.close(() => {
    console.log('[Server] HTTP server closed. Bye.');
    process.exit(0);
  });
});
