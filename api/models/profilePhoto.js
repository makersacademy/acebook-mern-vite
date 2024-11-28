const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
    image: {
    data: Buffer,
    contentType: String
    }
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;