const express = require('express');
//Authentication 
const requireAuth = require('../middleware/requireAuth')

// Controller Function 
const { addCompany } = require('../controllers/companyController');

const { getCompany,getCompanyAll } = require('../controllers/companyController');

const { updateCompany } = require('../controllers/companyController');
const router = express.Router();

// Require auth for all routes
router.use(requireAuth);

// require auth for all routes
router.use(requireAuth)

// Company  route
router.post('/add', addCompany);
router.get('/get', getCompany);
router.post('/get', getCompanyAll);
router.put('/update/:companyId', updateCompany);
router.get('/get/:admin_id', getCompany);


router.post('/update/:companyId', updateCompany);

module.exports = router;
