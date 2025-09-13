const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const uploadFile = require("../services/storage.service");

// Register API function

async function registerController(req, res) {
	const { username, fullName, email, password, confirmPassword } = req.body;
	const file = req.file;


	const isUserAlreadyExists = await userModel.findOne({ username });

	if (isUserAlreadyExists) {
		return res.status(400).json({
			message: "User Already Exists...",
		});
	}

	if(password !== confirmPassword){
		return res.status(400).json({
			message: "Password and Confirm Password do not match",
		});
	}

	let profilePicUrl = null;
	if (file) {
		try {
			const uploadResult = await uploadFile(file.buffer, `${uuidv4()}`);
			profilePicUrl = uploadResult.url;
		} catch (error) {
			return res.status(500).json({
				message: "Failed to upload profile picture",
				error: error.message,
			});
		}
	}

	const user = await userModel.create({
		username,
		password: await bcrypt.hash(password, 10),
		profilePic: profilePicUrl,
		fullName,
		email,
	});

	const token = jwt.sign(
		{
			id: user._id,
		},
		process.env.JWT_SECRET
	);

	const cookieOptions = {
		httpOnly: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		secure: process.env.NODE_ENV === 'production',
	};

	res.cookie("token", token, cookieOptions);

	res.status(201).json({
		message: "User Created Successfully...",
		user,
	});
}

// Login API function

async function loginController(req, res) {
	const { username, password } = req.body;

	const user = await userModel.findOne({
		username,
	});

	if (!user) {
		return res.status(400).json({
			message: "Unauthorized, User Not Found...",
		});
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return res.status(400).json({
			message: "Unauthorized, Invalid Password...",
		});
	}

	const token = jwt.sign(
		{
			id: user._id,
		},
		process.env.JWT_SECRET
	);

	const cookieOptions = {
		httpOnly: true,
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		secure: process.env.NODE_ENV === 'production',
	};

	res.cookie("token", token, cookieOptions);

	res.status(200).json({
		message: "User Logged-In Successfully...",
		user: {
			username: user.username,
			id: user._id,
		},
	});
}

// User Details API function
async function userDetailsController(req, res) {
	const user = req.user;

	res.status(200).json({
		message: "User Details Fetched Successfully...",
		user,
	});
}

// LogOut API function
async function logoutController(req, res) {
	const cookieOptions = {
		sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		secure: process.env.NODE_ENV === 'production',
	};
	res.clearCookie("token", cookieOptions);
	res.status(200).json({
		message: "User Logged Out Successfully...",
	});
}

module.exports = {
	registerController,
	loginController,
	logoutController,
	userDetailsController,
};
