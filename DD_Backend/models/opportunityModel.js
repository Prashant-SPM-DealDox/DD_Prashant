const mongoose = require("mongoose");
// const User = require("../models/adminModel");
const account = require("../models/accountsModel");

const Schema = mongoose.Schema;

const Opportunities = new Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dd_admin",
  },
  account_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dd_accounts",
  },
  accounts: {
    type: String,
  },
  opportunity_name: {
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
  net_price: {
    type: String,
  },
  margin: {
    type: String,
  },
  cost: {
    type: Number,
  },
  stage: {
    type: String,
  },
  probability: {
    type: String,
  },
  hours: {
    type: String,
  },
  close: {
    type: Date,
  },
  start: {
    type: Date,
  },
  duration_weeks: {
    type: Number,
  },
  owner: {
    type: String,
  },
  region: {
    type: String,
  },
  vertical: {
    type: String,
  },
  practice: {
    type: String,
  },
  currency: {
    type: String,
  },
  status: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  org: {
    type: String,
  },
  opportunity_type: {
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
  external_references_id1: {
    type: String,
  },
  external_references_id2: {
    type: String,
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

module.exports = mongoose.model("dd_opportunities", Opportunities);
