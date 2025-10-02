const multer = require("multer");
const express = require("express");
const {
	getPostController,
	createPostController,
	getAllPostsController,
	getPostByidController,
	updatePostController,
	deletePostController,
} = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({
	storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPostController);

router.get("/", authMiddleware, getPostController);

router.get("/all", authMiddleware, getAllPostsController);

router.get("/:id", authMiddleware, getPostByidController);

router.patch("/:id", authMiddleware, updatePostController);

router.delete("/:id", authMiddleware, deletePostController);

module.exports = router;
