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

const uploadRoot = path.join(__dirname, '..', 'uploads');
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
const upload = multer({ storage });

router.get('/', getSettings);

router.put('/', protect, upload.single('logo'), updateSettings);

module.exports = router;
