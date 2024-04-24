const express = require("express");
const router = express.Router();

const MusicController = require("../controllers/music");

router.get("/genre", MusicController.getGenres);
router.get("/genre/:id/artists", MusicController.getArtistsForGenre);
router.get("/artist/:id/top", MusicController.getTopTracksForArtist);
router.get("/track/:id", MusicController.getTrack);

module.exports = router;
