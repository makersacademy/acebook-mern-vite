const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.get("/:username", PostsController.getPostsForUser);
router.post("/", PostsController.createPost);
router.post("/:post_id", upload.single('photo'), PostsController.setPostPhoto);

router.post("/like", PostsController.likePost);
router.delete("/:id", PostsController.deletePost);

module.exports = router;
