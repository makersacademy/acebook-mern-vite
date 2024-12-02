const mongoose = require("mongoose");

const PhotoDetailsSchema = new mongoose.Schema({
        photoFileName: String,
        photoFilePath: String,
        user_id: String,
    }, 
    {
    collection: "Photo",
    }
);

const Photo = mongoose.model("Photo", PhotoDetailsSchema);

module.exports = Photo;