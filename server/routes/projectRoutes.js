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

const uploadRoot = path.join(__dirname, '..', 'uploads');
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


const upload = multer({ storage });

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

