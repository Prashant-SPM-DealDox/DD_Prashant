const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "dd_admin" },
    title: { type: String },
    catelogCategory: { type: String },
    catelogStatus: { type: String },
    isGlobal: { type: Boolean },
    isWide: { type: Boolean },
    templateUpdateType: { type: String },
    updateNotification: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: false } // Disable Mongoose timestamps option
);

// Update the updatedAt field before saving the document
SurveySchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("dd_survey_collection", SurveySchema);
