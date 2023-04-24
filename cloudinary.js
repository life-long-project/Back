require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const deleteFile = require('./fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


function uploadImage(file, callback) {
    cloudinary.uploader.upload(file.path, {folder:"images"},function(err, result) {
        if (err) {
            console.error(err);
            return callback(err);
        }
        console.log('Image uploaded successfully.');
        // Delete file from server
        console.log(file.path)
        deleteFile(file.path);
        callback(null, result);
    });
}

module.exports = uploadImage;
