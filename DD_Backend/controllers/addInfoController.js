const User = require("../models/userModel");
const AddInfo = require("../models/addInfoModel");

const addInfoSave = async (req, res) => {
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

  const {dynamicFields} = req.body;
  try {
    const addInfo_data = await AddInfo.create({dynamicFields});

    if (addInfo_data) {
      res.status(200).json({ success: "Success" });
    } else {
      res.status(200).json({ error: "Failed" });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};
module.exports = { addInfoSave };
