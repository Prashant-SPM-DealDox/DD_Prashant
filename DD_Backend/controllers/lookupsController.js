// const Lookups = require("../models/lookupsModel");
// const LookupsDataModel = require("../models/lookups_dataModel");
const mongo = require('../adaptor/mongodb.js');

const reqHeadersDB = (req) => {
  return req.headers['x-key-db'] ||  req.headers['x-key-db'] !== '' ? req.headers['x-key-db'] : null;
}

const md5 = require('md5')

// add a lookups
const addLookups = async (req, res) => {
  let user_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    user_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    user_id = req.user._id;
    people_id = null;
  }
  const { class_name, parent_lookup } = req.body;
  // const lookupId = req.body.lookupId;
  const trimmedLowerCaseClassName = class_name.trim();
  try {
    // const lookups = await Lookups.find({ user_id: user_id, class_name: {$regex: new RegExp(`^${trimmedLowerCaseClassName}$`, 'i')} });
    const lookups = await mongo.GetDocument("lookup", { user_id: user_id, class_name: { $regex: new RegExp(`^${trimmedLowerCaseClassName}$`, 'i') } }, {}, {}, reqHeadersDB(req));
    if (lookups.length == 0) {
      // const lookups_data = await Lookups.create({ user_id: user_id, class_name, parent_lookup });
      const lookups_data = await mongo.InsertDocument("lookup",
       { user_id: user_id, class_name, parent_lookup }, reqHeadersDB(req));
      if (lookups_data) {
        res.status(200).json({ status: "Success", message: "Successfully created", data: lookups_data })
      } else {
        // console.log(lookups_data);
        res.status(200).json({ status: "Failed", message: "Failed " })
      }

    } else {
      res.status(200).json({ status: "Failed", message: "Class Name Already Exists!" })
    }
  } catch (error) {
    res.status(200).json({ status: "Failed", message: "Failed " + error.message })
  }
}

const getLookups = async (req, res) => {
  const user = req.user;
  if (user) {
    let user_id, people_id;

    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }
    try {
      // const lookups_data = await Lookups.find({ user_id: user_id });
      const lookups_data = await mongo.GetDocument("lookup", { user_id: user_id }, {}, {}, reqHeadersDB(req));
      if (!lookups_data) {
        res.status(200).json({ status: "Failed", message: "Loopups Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: lookups_data });
      }
    } catch (error) {
      res.status(200).json({ status: "Failed", message: "Failed! " + error.message });
    }
  }
};


// update a lookups
const updateLookups = async (req, res) => {
  // console.log("+++++++++++++++++++")
  let user_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    user_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    user_id = req.user._id;
    people_id = null;
  }
  const { lookup_accesskey, lookupData, lookupOptions } = req.body;
  // console.log("--------", lookup_accesskey, lookupOptions);
  // console.log("#$%$%^" + class_name + parent_lookup + "@#$%@#$%^");
  const trimmedClassName = lookupData.class_name.trim();

  try {
    // Check for duplicate class_name
    const existingLookups = await mongo.GetOneDocument("lookup", { user_id, class_name: { $regex: new RegExp(`^${trimmedClassName}$`, 'i') }, _id: { $ne: lookup_accesskey } }, {}, {}, reqHeadersDB(req));

    if (!existingLookups) {
      // Check for duplicate lookups_name within the same lookup_accesskey
      const duplicateLookupName = lookupOptions.some((option, index) => {
        // Case-insensitive comparison and trim leading and trailing spaces
        const normalizedLookupName = option.lookups_name.trim().toLowerCase();
        return lookupOptions.findIndex((o, i) => o.lookups_name.trim().toLowerCase() === normalizedLookupName && i !== index) !== -1;
      });
      if (!duplicateLookupName) {
        // Update lookup data
        const lookups_datas = await mongo.findByIdAndUpdateDocument("lookup", lookup_accesskey, { class_name: trimmedClassName, parent_lookup: lookupData.parent_lookup, lookupOptions }, { new: true }, reqHeadersDB(req));

        if (lookups_datas) {
          res.status(200).json({ status: "Success", message: "Successfully updated", data: lookups_datas });
        } else {
          // console.log(lookups_datas);
          res.status(200).json({ status: "Failed", message: "Failed updating" });
        }
      } else {
        res.status(200).json({ status: "Failed", message: "Duplicate lookups_name within the same lookup_accesskey" });
      }
    } else {
      res.status(200).json({ status: "Failed", message: "Class Name Already Exists!" });
    }
  } catch (error) {
    res.status(500).json({ status: "Failed", message: "Failed " + error.message });
  }
};

module.exports = { addLookups, getLookups, updateLookups }

