const multer = require('multer');

// Configure storage
const storage = multer.memoryStorage(); // Store in memory to directly upload to Cloudinary

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;
