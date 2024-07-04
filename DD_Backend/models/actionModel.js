const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ActionsSchema = new Schema({
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
});
module.exports = mongoose.model("dd_survey_actions", ActionsSchema);
