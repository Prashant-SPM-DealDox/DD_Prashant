const express = require('express');


const { updatePeoplePassword } = require("../controllers/setPeoplePasswordController");
  
  const router = express.Router();

  router.put('/updatePassword', updatePeoplePassword);


module.exports = router;