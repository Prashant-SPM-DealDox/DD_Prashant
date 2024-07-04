const express = require('express');

//Authentication 
const requireAuth = require('../middleware/requireAuth');

const { addPeopleUser } = require('../controllers/peopleuserController');

const router = express.Router();

// require auth for all routes
router.use(requireAuth);

router.post('/peopleSignUp', addPeopleUser);

module.exports = router;

