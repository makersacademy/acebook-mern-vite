const User = require("../models/user");
const { generateToken } = require("../lib/token");
const express = require('express');
const multer = require('multer');
const Profile = require('../models/profile');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({ destination: (req, file, cb) => { 
    const uploadPath = path.join(__dirname, '..', 'uploads');
    cb(null, uploadPath); }, filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); } });
    const uploadMiddleware = multer({ storage: storage });


const upload = async (req, res) => {
        try {
            const profilePicPath = `uploads/${req.file.filename}`;
            console.log('File Path:', profilePicPath);
            const { bio } = req.body;
            const profile = new Profile({
                bio,
                profilePictureURL: profilePicPath,
                author: req.user_id
            });
            await profile.save();
            const newToken = generateToken(req.user_id);
            res.status(201).json({
            message: "Picture Uploaded",
            upload: {
            _id: profile._id,
            profilePictureURL: profile.profilePictureURL,
            userId: profile.author,
            },
            token: newToken,
            path: profilePicPath,
  });
        } catch (error) {
            console.error('Error uploading file', error);
            res.status(500).json({ message: 'Error uploading file', error });
        }
};



module.exports = { upload, uploadMiddleware };