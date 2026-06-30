const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  getServices,
  createService,
  updateService,
  deleteService,
  updateChildService,
  addGalleryImages,
  deleteGalleryImage,
  reorderGallery,
  updateGalleryImage
} = require('../controllers/serviceController');

const path = require('path');
const fs = require('fs');
const os = require('os');

const uploadRoot = path.join(os.tmpdir(), 'pd2_uploads');
const serviceDir = path.join(uploadRoot, 'services');

[uploadRoot, serviceDir].forEach(dir => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {}
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      fs.mkdirSync(serviceDir, { recursive: true });
    } catch (err) {}
    console.log(`[Multer Service Upload] Field: ${file.fieldname}, File: ${file.originalname}, Target: ${serviceDir}`);
    cb(null, serviceDir);
  },
  filename(req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, '_');
    const filename = Date.now() + '-' + safeName;
    console.log(`[Multer Service Upload] Saving filename: ${filename}`);
    cb(null, filename);
  }
});
const fileFilter = (req, file, cb) => {
  const allowedImages = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml'];
  if (allowedImages.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Only images are allowed.`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max per file
});

// Parent CRUD
router.get('/', getServices);
router.post('/', protect, upload.single('coverImage'), createService);
router.put('/:id', protect, upload.single('coverImage'), updateService);
router.delete('/:id', protect, deleteService);

// Child metadata update (title, description, features, coverImage)
router.put('/:id/children/:childIdx', protect, upload.single('coverImage'), updateChildService);

// Gallery operations
router.post('/:id/children/:childIdx/gallery', protect, upload.array('gallery', 20), addGalleryImages);
router.put('/:id/children/:childIdx/gallery/:imgIdx', protect, updateGalleryImage);
router.delete('/:id/children/:childIdx/gallery/:imgIdx', protect, deleteGalleryImage);
router.put('/:id/children/:childIdx/gallery/reorder', protect, reorderGallery);

module.exports = router;
