var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var GUIDED_SECTION_SCHEMA = {};
GUIDED_SECTION_SCHEMA.GUIDED_SECTION = {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Replace 'User' with the actual referenced model name
    },
    account_id: {
      type: String,
      required: true,
    },
    opportunity_id: {
      type: String,
      required: true,
    },
    quote_id: {
      type: Number,
      required: true,
    },
    template_type: {
      type: String,
      required: true,
    },
    section_key: {
      type: String,
      required: true,
    },
    section_count: {
      type: String,
      required: true,
    },
    section_name: {
      type: String,
      required: true,
      maxlength: 300,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    modified_at: {
      type: Date,
      default: Date.now,
    },
  };
module.exports = GUIDED_SECTION_SCHEMA;
