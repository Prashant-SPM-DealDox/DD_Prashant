const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { helpRequest } = require('../controllers/helpController')

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

router.post('/create', helpRequest);


module.exports = router;