const dns = require('dns');
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore if unsupported in environment
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Configure environment variables (support .env.local or standard .env)
const localEnvPath = path.join(__dirname, '.env.local');
if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
} else {
  dotenv.config();
}

// Connect to Database & Seed Clients helper
const Client = require('./models/Client');
let seeded = false;

const ensureDBAndSeed = async () => {
  await connectDB();
  if (!seeded) {
    try {
      const count = await Client.countDocuments();
      if (count === 0) {
        console.log('Seeding initial clients...');
        const initialClients = [
          "PVR GROUP", "HOTEL - CRAB", "ROYAL ICON", "PVR CLASSIC",
          "CORNER STONE", "ROYAL RIGHTWAY", "CITY ELITE", "BHAVISHYA HILLS",
          "SLV", "URBAN MEADOWS", "SKY TOWERS", "ANANDALAHARI", "PRIDE"
        ];
        const docs = initialClients.map((name, index) => ({
          name,
          order: index,
          active: true
        }));
        await Client.insertMany(docs);
        console.log('Initial clients seeded successfully!');
      }
      seeded = true;
    } catch (err) {
      console.error('Error seeding clients:', err.message);
    }
  }
};

// Fire DB connection asynchronously on cold start
ensureDBAndSeed();

// Ensure upload directories exist safely
try {
  fs.mkdirSync(path.join(__dirname, 'uploads', 'thumbnails'), { recursive: true });
  fs.mkdirSync(path.join(__dirname, 'uploads', 'videos'), { recursive: true });
} catch (err) {
  // Ignore in read-only environments (e.g. Vercel serverless)
}

const app = express();

// Middleware to ensure DB connection per request in serverless
app.use(async (req, res, next) => {
  await ensureDBAndSeed();
  next();
});

// Security and Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(limiter);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://prosper-designs.vercel.app",
  "https://www.prosper-designs.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    console.log("Blocked Origin:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan('dev'));

// Serve Static Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health & Info Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Backend running successfully",
    data: null
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: "Health OK",
    data: { status: "ok" }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: "API Health OK",
    data: { status: "ok" }
  });
});

// Route Handlers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));

// Global Error Handler
app.use(errorHandler);

module.exports = app;
