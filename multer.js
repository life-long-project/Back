const multer = require('multer');
const path = require('path');
require("dotenv").config();
const uploadDir = process.env.UPLOAD_DIR || "./uploads";

// Set storage engine
const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    },
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    }
});

// Init upload
const upload = multer({
    storage: storage,
    //todo: edit your limits
    // limits: { fileSize: 1000000 },
    fileFilter: function(req, file, callback) {
        checkFileType(file, callback);
    }
}).array('images');

// Check file type
function checkFileType(file, callback) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check the file extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check the MIME type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return callback(null, true);
    } else {
        return callback('Error: Images Only!');
    }
}

module.exports = upload;
