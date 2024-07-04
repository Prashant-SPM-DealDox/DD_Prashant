var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UNAPPROVED_USERS_SCHEMA = {};
UNAPPROVED_USERS_SCHEMA.UNAPPROVED_USERS = {

    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    password: {
      type: String,
    },
    company: {
      type: String,
    },
    job_title: {
      type: String,
    },
    email: {
      type: String,
    },
    no_of_emp: {
      type: String,
    },
    phone_num: {
      type: String,
    },
    country: {
      type: String,
    },
    created_at: {
      type: Date,
      default: new Date(),
    },
    modified_at: {
      type: Date,
      default: new Date(),
    },
    verifyToken: {
      type: String
    },
    otp: {
      type: String
    },
    status: {
      type: String,
      default: "UnApproved"
    },
    dbName: {
      type: String,
    },
  };
module.exports = UNAPPROVED_USERS_SCHEMA;
