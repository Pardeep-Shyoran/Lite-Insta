const { v4: uuidv4 } = require('uuid')
const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");


async function createPostController(req, res) {
    const file = req.file;

    if (!file || !file.buffer) {
        return res.status(400).json({ message: 'No image file provided. Ensure the request is multipart/form-data and the file field is named "image".' });
    }

    const base64Image = Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user: req.user._id
    });

    res.status(201).json({
        message: "Post Created Successfully...",
        post,
    });
}


async function getPostController(req, res) {
    const user = req.user;

    // ensure we query by the user's _id (not the whole object)
    const posts = await postModel.find({ user: user._id }).populate('user', 'username profilePic');

    res.status(200).json({
        message: "All Posts fetched...",
        posts,
    });
}


module.exports = {
	createPostController,
	getPostController,
};