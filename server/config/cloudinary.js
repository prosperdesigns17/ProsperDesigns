const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath, folder = 'prosper_design') => {
  try {
    if (!localFilePath) return null;
    
    console.log(`[Cloudinary Upload] Uploading ${localFilePath} to folder ${folder}...`);
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folder,
      resource_type: 'auto'
    });

    console.log(`[Cloudinary Upload Success] URL: ${result.secure_url}`);

    // Delete local temporary file after successful upload
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        console.log(`[Cloudinary Temp Clean] Removed temporary local file: ${localFilePath}`);
      } catch (unlinkErr) {
        console.error(`[Cloudinary Temp Clean Error] Could not delete ${localFilePath}:`, unlinkErr);
      }
    }

    return {
      secure_url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (err) {
        console.error('Failed to delete local file on error:', err);
      }
    }
    throw error;
  }
};

module.exports = { cloudinary, uploadToCloudinary };
