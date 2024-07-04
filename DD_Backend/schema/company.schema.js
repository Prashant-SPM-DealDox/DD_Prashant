var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var COMPANY_SCHEMA = {};
COMPANY_SCHEMA.COMPANY = {
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

};
module.exports = COMPANY_SCHEMA;
