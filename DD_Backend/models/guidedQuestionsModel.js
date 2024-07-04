const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GuidedQuestionSchema = new Schema(
  {
    guidedId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    surveySectionId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    surveyQuestionId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dd_admins", // Assuming 'users' is the name of the users collection
      required: true,
    },
    //   survey_questions_num: {
    //     type: String,
    //   },
    answer: {
      type: String | Boolean | Number,
    },
    questionName: {
      type: String,
    },
    isRequired: {
      type: Boolean,
    },
    questionType: {
      type: String,
    },
    questionNote: {
      type: String,
    },
    questionCategory: {
      type: String,
    },
    externalRefId: {
      type: String,
    },
    linkToQuestion: {
      type: String,
    },
    questionPosition: {
      type: Number,
    },
    // questionIndex: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("dd_guided_questiondata", GuidedQuestionSchema);
