const express = require("express");

const router = express.Router();
const tokenChecker = require("../../api/middleware/tokenChecker");

const UsersController = require("../controllers/users");

const logReq = (req) => {
    console.log(req);
}

router.post("/", UsersController.create);
router.get("/id", tokenChecker, UsersController.getId);
router.get("/", tokenChecker, UsersController.getAllUserInfo)

module.exports = router;
