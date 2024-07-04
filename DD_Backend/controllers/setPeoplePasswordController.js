// const People = require('../models/peopleModel');
const bcrypt = require('bcrypt');
const mongo = require('../adaptor/mongodb.js');

const reqHeadersDB = (req) => {
  return req.headers['x-key-db'] ? req.headers['x-key-db'] : null;
}
const updatePeoplePassword = async (req, res) => {
  const { admin_id, email, password } = req.body;
  
  try {
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const updatedDocument = await mongo.UpdateDocument(
      "people",
      { admin_id: admin_id, email: email },
      { $set: { password: hash } },
      reqHeadersDB(req)
    );

    if (updatedDocument.modifiedCount >0 && updatedDocument.acknowledged) {
      return res.status(200).json({ status: 'Success', message: 'Password Updated' });
    } else {
      return res.status(400).json({ status: 'Error', message: 'Unable to Update Password'});
    }
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


  module.exports = { updatePeoplePassword }