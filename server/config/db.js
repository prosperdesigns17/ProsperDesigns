const mongoose = require('mongoose');

let isConnected = false;

const FALLBACK_URI = 'mongodb+srv://ProsperDesign:RamResh%40721@cluster0.uourex2.mongodb.net/';

const connectDB = async () => {
  // Reuse existing connection — critical for serverless environments
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || FALLBACK_URI;
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,  // Fail fast if no server reachable
      socketTimeoutMS: 45000,          // Close sockets after 45s of inactivity
    });

    isConnected = true;
    console.log(`[DB] MongoDB connected: ${conn.connection.host}`);

    // Observability — log connection lifecycle events
    mongoose.connection.on('disconnected', () => {
      console.warn('[DB] MongoDB disconnected. Connection will be re-established on next request.');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('[DB] MongoDB reconnected successfully.');
      isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      console.error('[DB] MongoDB connection error:', err.message);
    });

  } catch (error) {
    console.error(`[DB] MongoDB connection failed: ${error.message}`);
    isConnected = false;
    // Re-throw so callers (ensureDBAndSeed) know the DB is unavailable
    throw error;
  }
};

module.exports = connectDB;

