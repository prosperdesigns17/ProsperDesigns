'use strict';
/**
 * processHandlers.js
 *
 * Global process-level safety handlers.
 * Import this ONCE at the very top of server.js before anything else.
 *
 * These handlers prevent the process from silently dying on:
 *   - Unexpected thrown errors outside async/await chains
 *   - Promises that reject without a .catch() handler
 *
 * They do NOT catch errors that are already handled by Express error middleware.
 */

process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception] An unhandled exception was thrown:');
  console.error(`  Name   : ${err.name}`);
  console.error(`  Message: ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(`  Stack  : ${err.stack}`);
  }
  // Do NOT call process.exit() — let active requests finish and let the
  // process manager (nodemon/PM2) decide whether to restart.
});

process.on('unhandledRejection', (reason) => {
  console.error('[Unhandled Promise Rejection] A promise was rejected without a handler:');
  if (reason instanceof Error) {
    console.error(`  Name   : ${reason.name}`);
    console.error(`  Message: ${reason.message}`);
    if (process.env.NODE_ENV !== 'production') {
      console.error(`  Stack  : ${reason.stack}`);
    }
  } else {
    console.error('  Reason :', reason);
  }
});
