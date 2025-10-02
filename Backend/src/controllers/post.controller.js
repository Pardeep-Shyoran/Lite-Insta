const { v4: uuidv4 } = require("uuid");
const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");
const mongoose = require("mongoose");

async function createPostController(req, res) {
    const file = req.file;

    if (!file || !file.buffer) {
        return res.status(400).json({
            message:
                'No image file provided. Ensure the request is multipart/form-data and the file field is named "image".',
        });
    }

    const base64Image = Buffer.from(file.buffer).toString("base64");

    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user: req.user._id,
    });

    res.status(201).json({
        message: "Post Created Successfully...",
        post,
    });
}

async function getPostController(req, res) {
    const user = req.user;

    // ensure we query by the user's _id (not the whole object)
    const posts = await postModel
        .find({ user: user._id })
        .populate("user", "username profilePic");

    res.status(200).json({
        message: "All Posts fetched...",
        posts,
    });
}

async function getAllPostsController(req, res) {
    try {
        // Fetch all posts and populate user info
        const posts = await postModel
            .find()
            .populate("user", "profilePic fullName")
            .sort({ createdAt: -1 }); // optional: latest posts first

        res.status(200).json({
            message: "All Posts fetched successfully...",
            posts,
        });
    } catch (error) {
        console.error("Error fetching all posts:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

async function getPostByidController(req, res) {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }

    try {
        const post = await postModel
            .findById(postId)
            .populate("user", "profilePic fullName");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the logged-in user owns the post
        if (post.user._id.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Access denied: You can only access your own posts" });
        }

        res.status(200).json({
            message: "Post fetched successfully...",
            post,
        });
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

async function updatePostController(req, res) {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Check if the logged-in user owns the post
        if (post.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Access denied: You can only update your own posts" });
        }

        // Update the post fields (e.g., caption)
        if (req.body.caption) {
            post.caption = req.body.caption;
        }
        await post.save();
        return res.status(200).json({ message: "Post updated successfully", post });
    } catch (err) {
        console.error("Error updating post:", err);
        return res
            .status(500)
            .json({ message: "Server Error", error: err.message });
    }
}

async function deletePostController(req, res) {
    const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID format" });
    }
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Check if the logged-in user owns the post
        if (post.user.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json({ message: "Access denied: You can only delete your own posts" });
        }

        await post.deleteOne();
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("Error deleting post:", err);
        return res
            .status(500)
            .json({ message: "Server Error", error: err.message });
    }
}

module.exports = {
    createPostController,
    getPostController,
    getAllPostsController,
    getPostByidController,
    updatePostController,
    deletePostController,
};
