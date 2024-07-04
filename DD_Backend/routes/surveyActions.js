const express = require('express');

//Authentication 
const requireAuth = require('../middleware/requireAuth')



// Controller Function 
const { addAction, templateMergeData } = require('../controllers/surveyActionsController');

const { getAction } = require('../controllers/surveyActionsController');

// const { updateCompany } = require('../controllers/companyController');

const router = express.Router();

// require auth for all routes
router.use(requireAuth)

// Company  route
router.post('/add', addAction);

router.post('/get', getAction);

router.post('/getTemp', templateMergeData);

// router.post('/update/:companyId', updateCompany);

// router.post('/update', updateCompany);

module.exports = router;


