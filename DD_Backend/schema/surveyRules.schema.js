var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SURVEY_RULES_SCHEMA = {};
SURVEY_RULES_SCHEMA.SURVEY_RULES = {
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
    },
    rule_number: {
      type: String,
    },
    rule_name: {
      type: String,
      required: true,
    },
    rule_condition_num: {
      type: Number,
    },
    rule_condition_name: {
      type: String,
    },
    question_or_value: {
      type: String,
    },
    rule_operator: {
      type: String,
    },
    rule_value: {
      type: String,
    },
    toggle: {
      type: String,
    },
    date: {
      type: String,
    },
    yes_no: {
      type: String,
    },
    yes_no_not: {
      type: String,
    },
    hi_lo_med: {
      type: String,
    },
    hi_norm_lo: {
      type: String,
    },
    currencies: {
      type: String,
    },
    user_message: {
      type: String,
    },
    languages: {
      type: String,
    },
    countries: {
      type: String,
    },
    numbers: {
      type: String,
    },
    whole_numbers: {
      type: String,
    },
    percentage: {
      type: String,
    },
    months: {
      type: String,
    },
    numeric_num: {
      type: String,
    },
    multiline_text: {
      type: String,
    },
    otherinput: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
  };
module.exports = SURVEY_RULES_SCHEMA;
