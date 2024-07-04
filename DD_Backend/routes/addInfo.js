const express = require('express')

//Authentication 
const requireAuth = require('../middleware/requireAuth')

// controller functions
const {addInfoSave} = require('../controllers/addInfoController')

const router = express.Router()

// require auth for all routes
router.use(requireAuth)

// Content route
router.post('/add',addInfoSave);


module.exports = router;