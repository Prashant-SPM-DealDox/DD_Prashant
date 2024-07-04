const mongoose = require("mongoose");

const ConditionSchema = new mongoose.Schema({
  conditionType: {
    type: String,
  },
  questionId: {
    type: String,
  },
  operator: {
    type: String,
  },
  questionValue: {
    type: String,
  },
});

const SurveyRuleSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is the name of the referenced model
    },
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ruleIndex: {
      type: String,
      required: true,
    },
    ruleName: {
      type: String,
      required: true,
    },
    condition: {
      type: ConditionSchema,
    },
    actions: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dd_survey_rules", SurveyRuleSchema);
