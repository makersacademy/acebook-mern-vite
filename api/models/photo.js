const mongoose = require("mongoose");

const PhotoDetailsSchema = new mongoose.Schema({
        photoFileName: String,
        photoFilePath: String,
        dateNow: Number,
        // userId
    }, 
    {
    collection: "Photo",
    }
);

const Photo = mongoose.model("Photo", PhotoDetailsSchema);

module.exports = Photo;