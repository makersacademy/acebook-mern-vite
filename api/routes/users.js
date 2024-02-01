const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// const logReq = (req) => {
//     console.log(req);
// }

router.post("/", UsersController.create);
router.get("/", UsersController.getAllUserInfo);

module.exports = router;
