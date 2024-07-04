const express = require('express')

// controller functions
const { loginUser, signupUser, generateQrcode, validate } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.get('/qrcode', generateQrcode)

router.post('/validate', validate)


module.exports = router;