const express = require('express')
//Authentication 
const requireAuth = require('../middleware/requireAuth');
// controller functions
const { addCompanyOrg,getCompanyOrg,updateCompanyOrg,deleteCompanyOrg} = require('../controllers/companyOrgController');

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// addCompanyOrg route
router.post('/add', addCompanyOrg);
router.get('/get', getCompanyOrg);
router.put('/update/:companyOrgId', updateCompanyOrg );
router.delete('/delete/:companyOrgId', deleteCompanyOrg);

module.exports = router;