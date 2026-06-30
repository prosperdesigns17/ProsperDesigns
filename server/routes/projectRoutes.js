const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const path = require('path');
const fs = require('fs');
const os = require('os');

const uploadRoot = path.join(os.tmpdir(), 'pd2_uploads');
const thumbnailDir = path.join(uploadRoot, 'thumbnails');
const videoDir = path.join(uploadRoot, 'videos');
const galleryDir = path.join(uploadRoot, 'gallery');

[uploadRoot, thumbnailDir, videoDir, galleryDir].forEach(dir => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {}
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let targetDir = thumbnailDir;
    if (file.fieldname === 'video') {
      targetDir = videoDir;
    } else if (file.fieldname === 'galleryImages' || file.fieldname === 'images') {
      targetDir = galleryDir;
    }

    try {
      fs.mkdirSync(targetDir, { recursive: true });
    } catch (err) {}

    console.log(`[Multer Project Upload] Field: ${file.fieldname}, File: ${file.originalname}, Target: ${targetDir}`);
    cb(null, targetDir);
  },
  filename(req, file, cb) {
    const safeName = file.originalname.replace(/\s+/g, '_');
    const filename = Date.now() + '-' + safeName;
    console.log(`[Multer Project Upload] Saving filename: ${filename}`);
    cb(null, filename);
  }
});

// Only allow image and video MIME types — reject everything else early
const fileFilter = (req, file, cb) => {
  const allowedImages = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml'];
  const allowedVideos = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
  const allowed = [...allowedImages, ...allowedVideos];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Only images and videos are allowed.`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max per file
});

router.get('/', getProjects);

router.post('/', protect, upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'galleryImages', maxCount: 30 },
  { name: 'images', maxCount: 30 }
]), createProject);

router.put('/:id', protect, upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'video', maxCount: 1 },
  { name: 'galleryImages', maxCount: 30 },
  { name: 'images', maxCount: 30 }
]), updateProject);

router.delete('/:id', protect, deleteProject);

module.exports = router;

