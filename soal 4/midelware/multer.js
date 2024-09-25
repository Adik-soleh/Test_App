// middleware/multer.js
const multer = require('multer');
const path = require('path');

// Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/', // Folder for storing uploaded images
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer with Storage, File Size Limit, and File Type Filtering
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // limit file size to 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image'); // 'image' should match the form field name

// Function to check file type (only images allowed)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

module.exports = upload;
