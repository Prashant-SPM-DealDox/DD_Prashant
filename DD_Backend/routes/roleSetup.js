const express = require('express');

const requireAuth = require('../middleware/requireAuth');


const { addRoles, getRoles, updateRoles, deleteRoles } = require('../controllers/roleSetupController');

const router = express.Router()

router.use(requireAuth)

router.post('/add', addRoles)
router.post('/get', getRoles)
router.post('/update/:id', updateRoles)
router.post('/delete/:id', deleteRoles)

module.exports = router;