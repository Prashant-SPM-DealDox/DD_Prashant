const mongoose = require("mongoose");
const moment = require("moment");
const { DECIMAL } = require("sequelize");

const Schema = mongoose.Schema;

const SurveyQuestionSchema = new Schema(
  {
    surveySectionId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dd_admins",
      required: true,
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
      // default: 0,
    },
    // questionIndex: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

// SurveyQuestionSchema.pre("save", async function (next) {
//   if (!this.question_position || this.isNew) {
//     const sectionExists = await this.constructor.exists({
//       surveyId: this.surveyId,
//       surveySectionId: this.surveySectionId,
//     });
//     if (sectionExists) {
//       const lastInSection = await this.constructor
//         .findOne({
//           surveyId: this.surveyId,
//           surveySectionId: this.surveySectionId,
//         })
//         .sort({ questionPosition: -1 })
//         .exec();

//       if (lastInSection) {
//         this.questionPosition = lastInSection.questionPosition + 1;
//       } else {
//         // No questions in this section yet, set position to 0
//         this.questionPosition = 0;
//       }

//       // Update positions for questions outside the section
//       await this.constructor
//         .updateMany(
//           {
//             surveyId: this.surveyId,
//             surveySectionId: { $ne: this.surveySectionId },
//             questionPosition: { $gte: lastInSection.questionPosition },
//           },
//           { $inc: { questionPosition: 1 } }
//         )
//         .exec();
//     } else {
//       // New section, find the last position across all sections for the given survey_key
//       const lastPosition = await this.constructor
//         .findOne({ surveyId: this.surveyId })
//         .sort({ questionPosition: -1 })
//         .exec();

//       if (lastPosition) {
//         // Set question position to the next position after the last question
//         this.questionPosition = lastPosition.questionPosition + 1;
//       } else {
//         // If there are no existing questions, set question position to 0
//         this.questionPosition = 0;
//       }
//     }
//   }

//   next();
// });

// SurveyQuestionSchema.pre("save", async function (next) {
//   if (!this.questionPosition || this.isNew) {
//     const sectionNumber = typeof this.questionIndex === 'number' ? Math.floor(this.questionIndex) : null;

//     if (sectionNumber !== null) {
//       const lastInSection = await this.constructor
//         .findOne({
//           surveyId: this.surveyId,
//           surveySectionId: this.surveySectionId,
//         })
//         .sort({ questionPosition: -1 })
//         .exec();

//       if (lastInSection) {
//         // Set question position to the next position after the last question in the section
//         this.questionPosition = lastInSection.questionPosition + 1;
//       } else {
//         // No questions in this section yet, set position based on the ascending order of section numbers
//         const lastPositionInSection = await this.constructor
//           .findOne({ surveyId: this.surveyId, surveySectionId: { $lt: this.surveySectionId } })
//           .sort({ surveySectionId: -1, questionPosition: -1 })
//           .exec();

//         if (lastPositionInSection) {
//           this.questionPosition = lastPositionInSection.questionPosition + 1;
//         } else {
//           this.questionPosition = 0;
//         }
//       }
//     } else {
//       // New section, find the last position across all sections for the given survey_key
//       const lastPosition = await this.constructor
//         .findOne({ surveyId: this.surveyId })
//         .sort({ surveySectionId: -1, questionPosition: -1 })
//         .exec();

//       if (lastPosition) {
//         // Set question position to the next position after the last question overall
//         this.questionPosition = lastPosition.questionPosition + 1;
//       } else {
//         // If there are no existing questions, set question position to 0
//         this.questionPosition = 0;
//       }
//     }

//     // Update positions for questions outside the section
//     await this.constructor
//       .updateMany(
//         {
//           surveyId: this.surveyId,
//           surveySectionId: { $gt: this.surveySectionId },
//         },
//         { $inc: { questionPosition: 1 } }
//       )
//       .exec();
//   }

//   next();
// });

// SurveyQuestionSchema.pre("save", async function (next) {
//   if (this.positionFromPayload) {
//     // Ensure the position is a positive integer
//     this.questionPosition = Math.max(0, this.positionFromPayload);
//     return next();
//   }
//   if (!this.questionPosition || this.isNew) {
//     const sectionNumber = typeof this.questionIndex === 'number' ? Math.floor(this.questionIndex) : null;

//     if (sectionNumber !== null) {
//       const lastInSection = await this.constructor
//         .findOne({
//           surveyId: this.surveyId,
//           surveySectionId: this.surveySectionId,
//         })
//         .sort({ questionPosition: -1 })
//         .exec();

//       if (lastInSection) {
//         // Set question position to the next position after the last question in the section
//         this.questionPosition = lastInSection.questionPosition + 1;
//       } else {
//         // No questions in this section yet, set position based on the ascending order of section numbers
//         const lastPositionInSection = await this.constructor
//           .findOne({ surveyId: this.surveyId, surveySectionId: { $lt: this.surveySectionId } })
//           .sort({ surveySectionId: -1, questionPosition: -1 })
//           .exec();

//         if (lastPositionInSection) {
//           this.questionPosition = lastPositionInSection.questionPosition + 1;
//         } else {
//           this.questionPosition = 0;
//         }
//       }
//     } else {
//       // New section, find the last position across all sections for the given survey_key
//       const lastPosition = await this.constructor
//         .findOne({ surveyId: this.surveyId })
//         .sort({ surveySectionId: -1, questionPosition: -1 })
//         .exec();

//       if (lastPosition) {
//         // Set question position to the next position after the last question overall
//         this.questionPosition = lastPosition.questionPosition + 1;
//       } else {
//         // If there are no existing questions, set question position to 0
//         this.questionPosition = 0;
//       }
//     }

//     // Update positions for questions outside the section
//     await this.constructor
//       .updateMany(
//         {
//           surveyId: this.surveyId,
//           surveySectionId: { $gt: this.surveySectionId },
//         },
//         { $inc: { questionPosition: 1 } }
//       )
//       .exec();
//   }

//   next();
// });

// SurveyQuestionSchema.pre("save", async function (next) {
//   if (!this.questionPosition || this.isNew) {
//     const sectionNumber = typeof this.questionIndex === 'number' ? Math.floor(this.questionIndex) : null;

//     if (sectionNumber !== null) {
//       const lastInSection = await this.constructor
//         .findOne({
//           surveyId: this.surveyId,
//           surveySectionId: this.surveySectionId,
//         })
//         .sort({ questionPosition: -1 })
//         .exec();

//       if (lastInSection) {
//         // Set question position to the next position after the last question in the section
//         this.questionPosition = lastInSection.questionPosition + 1;
//       } else {
//         // No questions in this section yet, set position based on the ascending order of section numbers
//         const lastPositionInSection = await this.constructor
//           .findOne({ surveyId: this.surveyId, surveySectionId: { $lt: this.surveySectionId } })
//           .sort({ surveySectionId: -1, questionPosition: -1 })
//           .exec();

//         if (lastPositionInSection) {
//           this.questionPosition = lastPositionInSection.questionPosition + 1;
//         } else {
//           this.questionPosition = 0;
//         }
//       }
//     } else {
//       // New section, find the last position across all sections for the given survey_key
//       const lastPosition = await this.constructor
//         .findOne({ surveyId: this.surveyId })
//         .sort({ surveySectionId: -1, questionPosition: -1 })
//         .exec();

//       if (lastPosition) {
//         // Set question position to the next position after the last question overall
//         this.questionPosition = lastPosition.questionPosition + 1;
//       } else {
//         // If there are no existing questions, set question position to 0
//         this.questionPosition = 0;
//       }
//     }

//     // Update positions for questions outside the section
//     await this.constructor
//       .updateMany(
//         {
//           surveyId: this.surveyId,
//           surveySectionId: { $gt: this.surveySectionId },
//         },
//         { $inc: { questionPosition: 1 } }
//       )
//       .exec();
//   } else if (this.isModified("questionIndex") && this.isNew) {
//     // If it's an update and a new question, preserve the original questionPosition
//     const originalPosition = await this.constructor.findById(this._id).select("questionPosition").exec();
//     this.questionPosition = originalPosition.questionPosition;
//   }

//   next();
// });

module.exports = mongoose.model("dd_survey_questiondata", SurveyQuestionSchema);
