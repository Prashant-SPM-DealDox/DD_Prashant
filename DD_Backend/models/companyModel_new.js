
const mongoose = require('mongoose');

const Schema = mongoose.Schema
  const Company = new Schema({
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dd_admin"
    },
    companyLogo: {
      type: String
    },
    companyName: {
      type: String
    },
    searchValue: {
      type: String
    },
    userAuthorizationDomain: {
      type: String
    },
    companyDomain: {
      type: String
    },
    contactPersonFirstName: {
      type: String
    },
    last_name: {
      type: String
    },
    contactPersonLastName: {
      type: String
    },
    phone:{
type:String
    },
    email: {
      type: String
    },
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },

    createdAt: {
      type: Date,
      default: new Date(),
    },
    modifiedAt: {
      type: Date,
      default: new Date(),
    }

  });

  module.exports = Company;

