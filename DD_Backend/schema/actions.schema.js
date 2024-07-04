var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ACTIONS_SCHEMA = {};
ACTIONS_SCHEMA.ACTIONS = {
    // Assuming 'users' is the name of the users collection },
    survey_section_key: {
      type: String,
    },
    survey_key: {
      type: String,
    },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "dd_admin" },
    actionCount: { type: String },
    action: { type: String },
    template: { type: String },
    createdAt: { type: Date, default: new Date() },
    modifiedAt: { type: Date, default: new Date() },
  };
module.exports = ACTIONS_SCHEMA;
