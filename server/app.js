const dns = require('dns');
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore if unsupported in environment
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
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

const initialClientNames = [
  "PVR GROUP", "HOTEL - CRAB", "ROYAL ICON", "PVR CLASSIC",
  "CORNER STONE", "ROYAL RIGHTWAY", "CITY ELITE", "BHAVISHYA HILLS",
  "SLV", "URBAN MEADOWS", "SKY TOWERS", "ANANDALAHARI", "PRIDE"
];

const ensureDBAndSeed = async () => {
  await connectDB();
  if (!seeded) {
    try {
      const count = await Client.countDocuments();
      if (count === 0) {
        console.log('Seeding initial clients...');
        const docs = initialClientNames.map((name, index) => ({
          name,
          order: index,
          active: true
        }));
        await Client.insertMany(docs);
        console.log('Initial clients seeded successfully!');
      } else {
        // Ensure all existing clients have active set to true if undefined
        await Client.updateMany({ active: { $exists: false } }, { $set: { active: true } });
      }
      seeded = true;
    } catch (err) {
      console.error('Error seeding clients:', err.message);
    }
  }
};

// Fire DB connection asynchronously on cold start
ensureDBAndSeed();

// Ensure upload directories exist safely using OS temp directory for serverless support
const os = require('os');
const uploadRoot = path.join(os.tmpdir(), 'pd2_uploads');
const requiredUploadFolders = [
  uploadRoot,
  path.join(uploadRoot, 'thumbnails'),
  path.join(uploadRoot, 'videos'),
  path.join(uploadRoot, 'gallery'),
  path.join(uploadRoot, 'services'),
  path.join(uploadRoot, 'projects'),
  path.join(uploadRoot, 'logos')
];

requiredUploadFolders.forEach(folder => {
  try {
    fs.mkdirSync(folder, { recursive: true });
  } catch (err) {
    // Ignore in read-only environments
  }
});


const app = express();

// Enable Gzip Compression & ETags for SEO & Page Speed
app.use(compression());
app.set('etag', 'strong');

// Cache & Crawler Prerender Middleware
app.use((req, res, next) => {
  // Static assets or GET API caching headers
  if (req.method === 'GET') {
    if (req.path.startsWith('/uploads') || req.path.match(/\.(jpg|jpeg|png|gif|webp|avif|mp4|svg|ico|css|js)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=60');
    }
  }

  // Crawler / Prerender Detection
  const userAgent = req.headers['user-agent'] || '';
  if (/bot|googlebot|bingbot|crawler|spider|slurp|facebookexternalhit|twitterbot/i.test(userAgent)) {
    res.setHeader('X-Prerender-Support', 'enabled');
  }
  next();
});

// Trust reverse proxy for Vercel / Cloudflare rate-limiting
app.set('trust proxy', 1);

// Middleware to ensure DB connection per request in serverless
app.use(async (req, res, next) => {
  await ensureDBAndSeed();
  next();
});

// Security and Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(limiter);

app.use(cors({
  origin: true,
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

// SEO Routes: Robots.txt & Sitemap.xml
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Disallow: /admin
Disallow: /api
Allow: /

Sitemap: https://prosperdesigns.in/sitemap.xml`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://prosperdesigns.in/</loc>
    <lastmod>2026-06-29</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://prosperdesigns.in/#about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://prosperdesigns.in/#services</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://prosperdesigns.in/#projects</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://prosperdesigns.in/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
});

// Health & Info Routes
app.get(['/', '/api'], (req, res) => {
  res.json({
    success: true,
    message: "Backend running successfully",
    data: null
  });
});

app.get(['/health', '/api/health'], (req, res) => {
  res.json({
    success: true,
    message: "Health OK",
    data: { status: "ok" }
  });
});

// Route Handlers (Support both /api/xxx and /xxx to guarantee no 404 rewrites)
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const messageRoutes = require('./routes/messageRoutes');
const settingRoutes = require('./routes/settingRoutes');
const clientRoutes = require('./routes/clientRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/projects', projectRoutes);
app.use('/projects', projectRoutes);

app.use('/api/services', serviceRoutes);
app.use('/services', serviceRoutes);

app.use('/api/messages', messageRoutes);
app.use('/messages', messageRoutes);

app.use('/api/settings', settingRoutes);
app.use('/settings', settingRoutes);

app.use('/api/clients', clientRoutes);
app.use('/clients', clientRoutes);

app.use('/api/testimonials', testimonialRoutes);
app.use('/testimonials', testimonialRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
