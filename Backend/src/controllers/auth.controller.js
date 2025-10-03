const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const uploadFile = require("../services/storage.service");
const ImageKit = require("imagekit");
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

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

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Password and Confirm Password do not match",
    });
  }

  let profilePicUrl = null;
  if (file) {
    try {
      const uploadResult = await uploadFile(file.buffer, `${uuidv4()}`);
      profilePicUrl = uploadResult.url;
      imagekitId = uploadResult.fileId;
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
    profilePic:
      profilePicUrl ||
      "https://ik.imagekit.io/00zfvrear/cohort-ai-social/76683d35-d0e9-4bf4-a630-99a6cc7da8c2.jpg?updatedAt=1759510400885",
    fullName,
    email,
    imagekitFileId: file ? imagekitId : null,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  const cookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("token", token, cookieOptions);

  // don't return password (even if hashed) in the response
  const safeUser = {
    id: user._id,
    username: user.username,
    profilePic: user.profilePic,
    fullName: user.fullName,
    email: user.email,
  };

  res.status(201).json({
    message: "User Created Successfully...",
    user: safeUser,
  });
}

// Login API function

async function loginController(req, res) {
  const { username, password } = req.body;

  // password field is marked select:false in the schema, so explicitly include it here
  const user = await userModel.findOne({ username }).select("+password");

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
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    message: "User Logged-In Successfully...",
    user: {
      username: user.username,
      id: user._id,
      profilePic: user.profilePic,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

// User Details API function
async function userDetailsController(req, res) {
  const user = req.user;

  res.status(200).json({
    message: "User Details Fetched Successfully...",
    user: {
      username: user.username,
      id: user._id,
      profilePic: user.profilePic,
      fullName: user.fullName,
      email: user.email,
    },
  });
  // log for debugging; use console.log (confirm.log is undefined and will throw)
  // console.log("User Details Sent:", user);
}

// LogOut API function
async function logoutController(req, res) {
  const cookieOptions = {
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    message: "User Logged Out Successfully...",
  });
}

async function updateUserController(req, res) {
  const user = req.user;

  const { fullName, username, password, confirmPassword } = req.body;
  const file = req.file;

  // Password confirmation
  if ((password || confirmPassword) && password !== confirmPassword) {
    return res.status(400).json({
      message: "Password and Confirm Password do not match",
    });
  }

  // ✅ Username validation
  if (username) {
    const newUsername = username.trim();
    if (newUsername.length < 3 || newUsername.length > 20) {
      return res
        .status(400)
        .json({ message: "Username must be 3–20 characters" });
    }
    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    if (!usernameRegex.test(newUsername)) {
      return res.status(400).json({
        message:
          "Username can only contain letters, numbers, underscores, and dots",
      });
    }
    const existingUser = await userModel.findOne({ username: newUsername });
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return res.status(400).json({ message: "Username already taken" });
    }
  }

  // Handle profile picture
  let profilePicUrl = user.profilePic;
  let imagekitId = user.imagekitFileId;

  if (file) {
    try {
      const uploadResult = await uploadFile(file.buffer, `${uuidv4()}`);

      if (user.imagekitFileId) {
        try {
          await imagekit.deleteFile(user.imagekitFileId);
        } catch (delErr) {
          // Optional: log but don’t break the update flow
          // console.warn("Old profile pic delete failed:", delErr.message);
        }
      }

      profilePicUrl = uploadResult.url;
      imagekitId = uploadResult.fileId;
    } catch (error) {
      return res.status(500).json({
        message: "Failed to upload profile picture",
        error: error.message,
      });
    }
  }

  // Build updated data
  const updatedData = {
    username: username || user.username,
    email: user.email,
    fullName: fullName || user.fullName,
    profilePic: profilePicUrl,
    imagekitFileId: imagekitId,
  };

  if (password) {
    updatedData.password = await bcrypt.hash(password, 10);
  }

  // Update user in DB
  let updatedUser;
  try {
    updatedUser = await userModel.findByIdAndUpdate(user._id, updatedData, {
      new: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database update failed", error: err.message });
  }

  // Success response
  res.status(200).json({
    message: "User Updated Successfully...",
    user: {
      username: updatedUser.username,
      id: updatedUser._id,
      profilePic: updatedUser.profilePic,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    },
  });
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  userDetailsController,
  updateUserController,
};
