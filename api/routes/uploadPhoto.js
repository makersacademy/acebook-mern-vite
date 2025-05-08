const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo");
const upload = require("../middleware/multerConfig");


router.post("/", upload.single('photo'), photoController.upload);

router.get("/", photoController.get);

module.exports = router;