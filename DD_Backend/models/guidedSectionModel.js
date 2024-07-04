const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GuidedSectionSchema = new Schema(
  {
    guidedId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
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
  //    createdAt: {
  //     type: Date,
  //     default: new Date(),
  //   },
  //   modifiedAt: {
  //     type: Date,
  //     default: new Date(),
  //   },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("dd_guided_section_data", GuidedSectionSchema);
