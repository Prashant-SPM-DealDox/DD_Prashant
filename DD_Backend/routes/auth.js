const express = require('express');

const requireAuth = require('../middleware/requireAuth');

// controller functions
const {  generateQrcode, validate, userStatusUpdate, userMobileStatusUpdate} = require('../controllers/adminController');

const router = express.Router()

// require auth for all routes
router.use(requireAuth);


router.get('/qrcode', generateQrcode);

router.post('/validate', validate);

router.put('/updateStatus', userStatusUpdate);

//Flutter API To reset mobilefirst_login Status
router.put('/updatemobileStatus', userMobileStatusUpdate)

module.exports = router;