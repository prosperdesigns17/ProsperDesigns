const mongoose = require('mongoose');

let isConnected = false;

const FALLBACK_URI = 'mongodb+srv://ProsperDesign:RamResh%40721@cluster0.uourex2.mongodb.net/';

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || FALLBACK_URI;
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // Fast timeout for serverless environments
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;
