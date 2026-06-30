const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  getSettings,
  updateSettings
} = require('../controllers/settingController');

const path = require('path');
const fs = require('fs');
const os = require('os');

const uploadRoot = path.join(os.tmpdir(), 'pd2_uploads');
const logoDir = path.join(uploadRoot, 'logos');

[uploadRoot, logoDir].forEach(dir => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {}
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      fs.mkdirSync(logoDir, { recursive: true });
    } catch (err) {}
    console.log(`[Multer Setting Upload] Field: ${file.fieldname}, File: ${file.originalname}, Target: ${logoDir}`);
    cb(null, logoDir);
  },
  filename(req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, '_');
    const filename = Date.now() + '-' + safeName;
    console.log(`[Multer Setting Upload] Saving filename: ${filename}`);
    cb(null, filename);
  }
});
const fileFilter = (req, file, cb) => {
  const allowedImages = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml'];
  if (allowedImages.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Only images are allowed for logo upload.`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max for logos
});

router.get('/', getSettings);

router.put('/', protect, upload.single('logo'), updateSettings);

module.exports = router;
