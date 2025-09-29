const multer = require('multer');
const express = require('express')
const {registerController, loginController, logoutController, userDetailsController} = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router()


// register and login handlers should directly handle the response.
// Chaining authMiddleware and userDetailsController after register/login
// causes "Can't set headers after they are sent" or unexpected 401s because
// registerController/loginController already send a response.
router.post('/register', upload.single("image"), registerController)
router.post('/login', loginController)
router.get('/logout', logoutController)
router.get('/user', authMiddleware, userDetailsController)

module.exports = router