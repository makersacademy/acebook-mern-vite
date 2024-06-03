const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();
router.get("/", UsersController.getAllUsers);
router.post("/", UsersController.create);
router.get("/profile", UsersController.getOneUser)
router.get("/profile:{userid}", UsersController.getOneUser)


module.exports = router;

