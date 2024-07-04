const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuotesSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dd_admin",
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dd_accounts",
    required: true,
  },
  opportunity_id: {
    type: String,
    required: true,
  },
  quotes_name: {
    type: String,
  },
  template_type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  template_name: {
    type: String,
    required: true,
  },
  quotes_price: {
    type: String,
  },
  quotes_sales_org: {
    type: String,
  },
  quotes_currency: {
    type: String,
  },
  quotes_duration: {
    type: String,
  },
  quotes_avg_rate: {
    type: String,
  },
  quotes_description: {
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
});
 
// SurveySectionSchema.index({ survey_key: 1 });
// SurveySectionSchema.index({ user_id: 1 });
 
module.exports = mongoose.model("dd_quote", QuotesSchema);
