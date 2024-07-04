const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const SurveySectionSchema = new Schema(
  {
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sectionName: {
      type: String,
    },
    isHide: {
      type: Boolean,
    },
    sectionPosition: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("dd_survey_section_data", SurveySectionSchema);
