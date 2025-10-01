const multer = require("multer");
const express = require("express");
const {
	getPostController,
	createPostController,
	getAllPostsController,
} = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({
	storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPostController);

router.get("/", authMiddleware, getPostController);

router.get("/all", authMiddleware, getAllPostsController);

module.exports = router;
