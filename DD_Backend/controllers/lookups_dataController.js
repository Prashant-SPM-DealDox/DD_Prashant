
const Lookups_data = require("../models/lookups_dataModel");
const md5 = require('md5')

const addLookupsData = async (req, res) => {
  console.log("+++++++++++++++++++")
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
  const { lookups_name, lookups_accesskey, code, value1, value2, disable, parent_lookups_data } = req.body;
  // const lookups_data_accesskey = md5(user_id+""+lookups_name+""+new Date());

  console.log("=====================");
  console.log(lookups_accesskey);
  try {
    const lookups = await Lookups_data.find({ user_id: user_id, lookups_accesskey: lookups_accesskey, lookups_name: lookups_name });
    if (lookups.length == 0) {
      const lookups_data = await Lookups_data.create({ user_id, lookups_name, lookups_accesskey, code, value1, value2, disable, parent_lookups_data });

      if (lookups_data) {
        res.status(200).json({ status: "Success", message: "Successfully created", data: lookups_data })
      } else {
        console.log(lookups_data);
        res.status(200).json({ status: "Failed", message: "Failed " })
      }

    } else {
      res.status(200).json({ status: "Failed", message: "Lookups Name Already Exists!" })
    }
  } catch (error) {
    console.log(error)
    res.status(200).json({ status: "Failed", message: "Failed " + error.message })
  }
}

const getLookupsData = async (req, res) => {
  const user = req.user;
  console.log(user)
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
    const { lookups_accesskey } = req.body;

    try {
      const lookups_data = await Lookups_data.find({ user_id: user_id, lookups_accesskey: lookups_accesskey });

      if (!lookups_data) {
        res.status(200).json({ status: "Failed", message: "Loopups Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: lookups_data });
      }
    } catch (error) {
      res.status(200).json({ status: "Failed", message: "Failed! " + error.message });
    }
  }
}

const updateLookupData = async (req, res) => {
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

  const { lookups_name, lookups_accesskey, code, value1, value2, disable, parent_lookups_data, lookups_data_id } = req.body;
  console.log("Dataaaaaa");
  console.log(lookups_name, lookups_accesskey, code, value1, value2, disable, parent_lookups_data, lookups_data_id);
  try {
    const existingLookup = await Lookups_data.findOne({ lookups_name, _id: { $ne: lookups_data_id } });

    if (existingLookup) {
      res.status(200).json({ status: "Failed", message: "Duplicate lookups_name" });
    } else {
      const lookups_data = await Lookups_data.findOne({ _id: lookups_data_id, lookups_accesskey: lookups_accesskey });
      if (lookups_data) {
        const updateLookupData = await Lookups_data.findByIdAndUpdate(lookups_data_id, { lookups_name: lookups_name, code: code, value1: value1, value2: value2, disable: disable, parent_lookups_data: parent_lookups_data }, { new: true });

        if (updateLookupData) {
          res.status(200).json({ status: "Success", message: "Successfully Update", data: updateLookupData })
        } else {
          res.status(200).json({ status: "Failed", message: "Failed To Update" });
        }
      } else {
        res.status(200).json({ status: "Failed", message: "Data not Found" });
      }
    }
  } catch (error) {
    res.status(200).json({ status: "Failed", message: "Failed" + error.message });
  }

}


module.exports = { addLookupsData, getLookupsData, updateLookupData }
