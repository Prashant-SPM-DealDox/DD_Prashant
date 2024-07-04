const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/adminModel");

const addInfoSchema = new Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dd_admin",
  },
  dynamicFields: [{
    id: String, 
    value: String, 
    dropdownValue: String,
    persistOnApply: Boolean,
    adminOnly: Boolean,
    readOnly: Boolean,
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("dd_addInfo", addInfoSchema);
