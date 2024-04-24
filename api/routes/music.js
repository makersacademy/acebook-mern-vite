const express = require("express");
const router = express.Router();

const MusicController = require("../controllers/music");

router.get("/genre", MusicController.getGenres);

module.exports = router;
