// const admin = require("../models/adminModel");
// const Config = require('../models/configModel');

const mongo = require('../adaptor/mongodb.js');

const reqHeadersDB = (req) => {
  return req.headers['x-key-db'] ? req.headers['x-key-db'] : null;
}

const addConfig = async (req, res) => {

  let admin_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
    people_id = null;
  }

  const { value1, value2, value3, value4, value5, value6, value7, value8 } = req.body;
  try {
    // const config_data = await Config.create({admin_id,value1,value2,value3,value4,value5,value6,value7,value8});
    const config_data = await mongo.InsertDocument("config", { admin_id, value1, value2, value3, value4, value5, value6, value7, value8 }, reqHeadersDB(req));
    if (config_data) {
      res.status(200).json({ success: "Successsssss" })
    } else {
      res.status(200).json({ error: "Failed" })
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" })
  }
}

const getConfig = async (req, res) => {

  let admin_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
  }

  try {
    // const config_data = await Config.find({admin_id: admin_id});
    const config_data = await mongo.GetDocument("config", { admin_id: admin_id }, {}, {}, reqHeadersDB(req));
    if (!config_data.length) {
      res.status(200).json({ status: "Failed", message: "config Data Not Found" });
    } else {
      res.status(200).json({ data: config_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};



const updateConfig = async (req, res) => {

  let admin_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
    people_id = null;
  }


  const config_id = req.params.id;
  console.log(config_id);

  const { value1, value2, value3, value4, value5, value6, value7, value8 } = req.body;
console.log(req.body,"lllllllllllllll");
  try {
    //      const updateResult = await Config.updateOne(
    const updateResult = await mongo.UpdateDocument(
      {
        admin_id: admin_id,
        _id: config_id,
      },
      {
        $set: { value1, value2, value3, value4, value5, value6, value7, value8 },
      },reqHeadersDB(req)
    );

    if (updateResult.nModified > 0) {
      res.status(200).json({ status: "Success", message: "config Updated" });
    } else {
      res.status(404).json({ status: "Error", message: "config Not Found" });
    }
  } catch (error) {
    console.error("Error updating config:", error);
    res.status(500).json({ error: "Failed to Update config" });
  }
};


module.exports = { addConfig, getConfig, updateConfig }
