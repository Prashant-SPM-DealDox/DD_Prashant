// const User = db.user;
const mongoose = require("mongoose");
// const User = require("../models/adminModel");

const Schema = mongoose.Schema;

const AccountsSchema = new Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dd_admin",
  },

  accounts: {
    type: String,
  },
  owner: {
    type: String,
  },
  external_references_id1 :{
    type: String,
  },
  external_references_id2 :{
    type: String,
  },
  crm_reference :{
    type: String,
  },
  parent_account: {
    type: String,
  },
  description: {
    type: String,
  },
  region: {
    type: String,
  },
  industry: {
    type: String,
  },
  vertical: {
    type: String,
  },
  type: {
    type: String,
  },
  billing_street1: {
    type: String,
  },
  billing_street2: {
    type: String,
  },
  billing_city: {
    type: String,
  },
  billing_state: {
    type: String,
  },
  billing_zip: {
    type: Number,
  },
  billing_country: {
    type: String,
  },
  billing_phone: {
    type: Number,
  },
  shipping_street1: {
    type: String,
  },
  shipping_street2: {
    type: String,
  },
  shipping_city: {
    type: String,
  },
  shipping_state: {
    type: String,
  },
  shipping_zip: {
    type: Number,
  },
  shipping_country: {
    type: String,
  },
  shipping_phone: {
    type: Number,
  },
  excelrate_partner: {
    type: String,
  },
  commercial_region: {
    type: String,
  },
  commercial_subregion: {
    type: String,
  },
  vat_number: {
    type: String,
  },
  delivery_area: {
    type: String,
  },
  access_key: {
    type: String,
  },
  notes: {
    type: String,
  },
  external_references_id1: {
    type: String,
  },
  external_references_id2: {
    type: String,
  },
  crm_reference: {
    type: String,
  },
  file_path: {
    type: String,
  },
  addInput: {
    type: [String],
  },
addInputValue:{
  type: [String],
},
  dropdownValue: {
    type: [String],
  },
  revision: {
    type: Number,
    default: 0,
  },
  created_by: {
    type: String,
  },
  modified_by: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = () => {
  return {
    mongoose: mongoose.model("dd_accounts", AccountsSchema),
    AccountsSchema,
  };
};
