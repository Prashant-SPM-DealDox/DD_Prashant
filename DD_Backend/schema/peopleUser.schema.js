var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PEOPLE_USER_SCHEMA = {};
PEOPLE_USER_SCHEMA.PEOPLE_USER = {

    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admin',
      },
      people_email:{
        type: String,
      },
      securityRole:{
        type: String,
      },
      password:{
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

};
module.exports = PEOPLE_USER_SCHEMA;
