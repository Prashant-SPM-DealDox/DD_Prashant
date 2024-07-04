const express = require('express');

// controller functions
const {  signupUser, loginUser, setGeneratedPin, forgotPassword, passwordreset, companyApproval, verifyCompanyOTP, validatePin, generateUrlTokenForThirdParty} = require('../controllers/adminController');

const router = express.Router()

// login route
router.post('/login', loginUser);

router.post('/redirectToDealDox', generateUrlTokenForThirdParty);

// signup route
router.post('/signup', signupUser);

// verify company
router.get('/companyApproval/:token', companyApproval);

router.post('/verifyOTP', verifyCompanyOTP);

router.post('/forgotpassword', forgotPassword);

router.post('/restpassword', passwordreset);


//----------------------------------------------Flutter Routes-----------------------------------------------------
//PIN SET 
router.put('/setPin', setGeneratedPin);

//VERIFY PIN
router.post('/verifyPin', validatePin);


module.exports = router;