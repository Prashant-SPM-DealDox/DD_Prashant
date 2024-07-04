var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SURVEY_SCHEMA = {};
SURVEY_SCHEMA.SURVEY = {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "dd_admin" },
    // Assuming 'users' is the name of the users collection },
    title: { type: String },
    category: { type: String },
    status: { type: String },
    globals: { type:Boolean },
    wide: { type: Boolean},
    update_type: { type: String },
    notification: { type: String },
    createdAt: { type: Date, default: new Date() },
    modifiedAt: { type: Date, default: new Date() },
  };
module.exports = SURVEY_SCHEMA;
