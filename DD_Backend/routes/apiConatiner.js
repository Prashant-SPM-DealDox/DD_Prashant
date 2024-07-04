const express = require("express");
const router = express.Router()
const { getAccountContainer } = require('../controllers/apiContainerController');

router.post('/', getAccountContainer);

module.exports = router;