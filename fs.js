require("dotenv").config();
const fs = require('fs');
const uploadDir = process.env.UPLOAD_DIR || "./uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Delete image
function deleteImage(path) {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Image deleted successfully.');
    });
}

module.exports = deleteImage;
