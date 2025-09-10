const { v4: uuidv4 } = require('uuid')
const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.service");
const uploadFile = require("../services/storage.service");


async function createPostController(req, res) {
    const file = req.file;

    const base64Image = new Buffer.from(file.buffer).toString('base64');

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
    })
}


async function getPostController(req, res) {
    const user = req.user
    const posts = await postModel.find({
        user
    })

    res.status(200).json({
        message: "All Posts fetched...",
        posts,
    })
}


module.exports = {
	createPostController,
	getPostController,
};