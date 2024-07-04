const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveyActionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming 'User' is the name of the referenced model
  },
  survey_key: {
    type: String,
    required: true,
  },
  survey_section_key: {
    type: String,
    required: true,
  },
  survey_rules_key: {
    type: String,
    required: true,
  },
  survey_action_number: {
    type: String,
    required: true,
  },
  survey_action_name: {
    type: String,
    required: true,
  },
  survey_actions_sections: {
    type: String,
  },
  pcrCalcTab:{
    type: String,
  },
  pcrCalcCell: {
    type: String,
  },
  calcTabTemplate: {
    type: String,
  },
  cell: [
    {
      celldata: { type: String },
      valuedata: { type: String },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("dd_survey_action", SurveyActionSchema);
