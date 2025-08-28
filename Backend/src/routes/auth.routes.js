const multer = require('multer');
const express = require('express')
const {registerController, loginController, logoutController, userDetailsController} = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router()


router.post('/register', 
    upload.single("image"), 
    registerController
)
router.post('/login', loginController)
router.get('/logout', logoutController)
router.get('/user', authMiddleware, userDetailsController)

module.exports = router