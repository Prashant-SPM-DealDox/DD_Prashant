const Survey = require("../models/surveyModel");
const SurveyQuestion = require("../models/surveyQuestionsModel");
const SurveySections = require("../models/surveySectionsModel");
const RulesModel = require("../models/rulesModel");
const CalcModel = require("../models/calcModel");
const mongoose = require("mongoose");

// Add a Survey
const addSurvey = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "Failed",
        message: "Authorization Failed",
      });
    }
    let user_id, people_id;
    if (req.user.admin_id) {
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      user_id = req.user._id;
      people_id = null;
    }
    const { surveyId, title, ...restParams } = req.body;
    const trimmedTitle = title.trim();
    const existingSurvey = await Survey.findOne({
      user_id,
      title: { $regex: new RegExp("^" + trimmedTitle + "$", "i") },
    });
    if (existingSurvey && !surveyId) {
      return res.status(400).json({
        status: "Failed",
        error: "Survey Name Already Exists",
        message: "Survey with the same name already exists",
      });
    }
    if (surveyId) {
      const survey_data = await Survey.findByIdAndUpdate(
        surveyId,
        { $set: { ...restParams, title: trimmedTitle } },
        { new: true }
      );
      if (survey_data) {
        return res.status(200).json({
          status: "Survey updated successfully",
          survey_key: surveyId,
          data: survey_data,
        });
      }
    } else {
      const survey_data = await Survey.create({
        ...restParams,
        title: trimmedTitle,
        user_id,
      });
      if (survey_data) {
        return res.status(200).json({
          status: "Survey added successfully",
          survey_key: survey_data._id,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Failed" });
  }
};

// Get a Survey
const getSurvey = async (req, res) => {
  let user_id, people_id;
  if (req.user) {
    // const user_id = req.user._id;

    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }
    try {
      const survey_data = await Survey.find({ user_id: user_id });

      if (!survey_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "survey Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survey_data });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};
//deleteSurvey
const deleteSurvey = async (req, res) => {
  const survey_id = req.params.id; // Accessing survey ID from URL parameter
  if (req.user) {
    let user_id, people_id;
    if (req.user.admin_id) {
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      user_id = req.user._id;
      people_id = null;
    }
    try {
      if (survey_id) {
        const existingSurvey = await Survey.findOne({
          user_id: user_id,
          _id: survey_id,
        });
        if (existingSurvey) {
          await Survey.deleteOne({ user_id: user_id, _id: survey_id });
          await SurveySections.deleteMany({ surveyId: survey_id });
          await SurveyQuestion.deleteMany({ surveyId: survey_id });
          await RulesModel.deleteMany({ surveyId: survey_id });
          await CalcModel.deleteOne({
            user_id: user_id,
            survey_key: survey_id,
          });

          res.status(200).json({
            status: "Success",
            message: "Survey deleted successfully",
          });
        } else {
          res.status(404).json({
            status: "Failed",
            message: "Survey with the provided key not found",
          });
        }
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Invalid _id provided for delete",
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(401).json({ status: "Failed", message: "Authorization Failed" });
  }
};
const getSurveyDetailsById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "Failed",
        message: "Authorization Failed",
      });
    }

    // const user_id = req.user._id;
    let user_id, people_id;

    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }
    const { surveyId } = req.params;

    const survey = await Survey.findOne({ _id: surveyId, user_id });
    let surveySections = await SurveySections.find({ surveyId }).sort({
      sectionPosition: 1,
    });

    let surveyQuestionsArr = [];

    if (surveySections.length > 0) {
      const promises = surveySections.map(async (sec) => {
        const surveySectionId = sec._id.toString();
        const surveyQuestions = await SurveyQuestion.find({
          surveyId,
          surveySectionId,
        }).sort({ questionPosition: 1 });

        if (surveyQuestions.length > 0) {
          const updatedKey = surveyQuestions.map(({ _id, ...rest }) => ({
            questionId: _id,
            sectionPosition: sec.sectionPosition,
            ...rest._doc,
          }));
          surveyQuestionsArr = surveyQuestionsArr.concat(updatedKey);
        }
      });

      await Promise.all(promises);
    }

    if (survey) {
      res.status(200).json({
        status: "Success",
        data: {
          surveyDetails: survey,
          surveySections: surveySections,
          surveyQuestions: surveyQuestionsArr,
        },
        message: "Survey found",
      });
    } else {
      res.status(200).json({
        status: "Success",
        data: null,
        message: "No survey found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Failed" });
  }
};
//Add Survey Section
const addSurveySections = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "failed", message: "Authorization failed" });
    }

    // const user_id = req.user._id;
    let user_id, people_id;

    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }
    const { _id } = req.body;
    if (_id) {
      await SurveySections.findByIdAndUpdate(_id, req.body);
      res.status(200).json({
        status: "success",
        data: req.body,
        message: "Survey section updated",
      });
    } else {
      const newSection = await SurveySections.create({
        user_id,
        ...req.body,
      });
      res.status(200).json({
        status: "success",
        data: newSection,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Failed! " + error.message });
  }
};
const deleteSurveySection = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Authorization failed" });
    }

    const { id: surveySectionId, surveyId } = req.body;
    const sectionToDelete = await SurveySections.findById(surveySectionId);
    const positionToDelete = sectionToDelete.sectionPosition;

    await SurveySections.findByIdAndDelete(surveySectionId);
    await RulesModel.deleteMany({ sectionId: surveySectionId });
    const deletedQuestions = await SurveyQuestion.deleteMany({
      surveySectionId,
    });
    const deletedQuestionsCount = deletedQuestions.deletedCount || 0;

    await SurveySections.updateMany(
      {
        sectionPosition: { $gt: positionToDelete },
        surveyId: mongoose.Types.ObjectId(surveyId),
      },
      { $inc: { sectionPosition: -1 } }
    );
    const remainingQuestions = await SurveyQuestion.find({
      surveyId: sectionToDelete.surveyId,
    });

    // Sort remaining questions by their original position
    const sortedQuestions = remainingQuestions.sort(
      (a, b) => a.questionPosition - b.questionPosition
    );

    // Update positions sequentially
    for (let i = 0; i < sortedQuestions.length; i++) {
      const question = sortedQuestions[i];
      question.questionPosition = i;
      await question.save();
    }

    res.status(200).json({ status: "Success" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Failed! " + error.message });
  }
};

const deleteSurveyQuestions = async (req, res) => {
  if (req.user) {
    let user_id, people_id;

    if (req.user.admin_id) {
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      user_id = req.user._id;
      people_id = null;
    }
    const { questionId } = req.params;

    try {
      const deletedQuestion = await SurveyQuestion.findById(questionId);
      const deletedQuestionPosition = deletedQuestion.questionPosition;
      //  const deletedQuestionIndex = deletedQuestion.questionPos;
      const surveySectionId = deletedQuestion.surveySectionId;
      const deletedQuestionsSurveyId = deletedQuestion.surveyId;
      await SurveyQuestion.findByIdAndDelete(questionId);

      await SurveyQuestion.updateMany(
        {
          surveyId: deletedQuestionsSurveyId,
          questionPosition: { $gt: deletedQuestionPosition },
        },
        {
          $inc: {
            questionPosition: -1,
          },
        }
      );

      res.status(200).json({
        status: 200,
        message: "Question deleted successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(401).json({ status: "Failed", message: "Authorization Failed" });
  }
};

const addSurveyQuestions = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "failed", message: "Authorization failed" });
    }

    let user_id, people_id;

    if (req.user.admin_id) {
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      user_id = req.user._id;
      people_id = null;
    }

    const { _id, surveySectionId, questionIndex } = req.body;

    if (_id) {
      // If updating an existing question
      const existingQuestion = await SurveyQuestion.findById(_id);

      if (!existingQuestion) {
        return res
          .status(404)
          .json({ status: "failed", message: "Question not found" });
      }

      // Preserve the original questionPosition
      const originalPosition = existingQuestion.questionPosition;

      // Update other fields, but not questionPosition
      await SurveyQuestion.findByIdAndUpdate(_id, {
        $set: req.body,
        questionPosition: originalPosition,
      });

      res.status(200).json({
        status: "success",
        message: "Question updated",
      });
    } else {
      const newQuestion = new SurveyQuestion({
        user_id,
        ...req.body,
      });

      newQuestion.surveySectionId = surveySectionId;

      const lastPosition = await SurveyQuestion.findOne({
        surveyId: newQuestion.surveyId,
      })
        .sort({ questionPosition: -1 })
        .exec();

      // Set the question position based on the last question globally
      newQuestion.questionPosition = lastPosition
        ? lastPosition.questionPosition + 1
        : 0;

      // Save the new question
      const savedQuestion = await newQuestion.save();

      // Sort questions by section and then assign positions
      const existingQuestions = await SurveyQuestion.find({
        surveyId: newQuestion.surveyId,
      })
        .sort({ surveySectionId: 1, questionPosition: 1 })
        .exec();

      for (let i = 0; i < existingQuestions.length; i++) {
        const existingQuestion = existingQuestions[i];
        const newPosition = i;

        if (existingQuestion.questionPosition !== newPosition) {
          await SurveyQuestion.findByIdAndUpdate(existingQuestion._id, {
            $set: { questionPosition: newPosition },
          });
        }
      }

      res.status(200).json({
        status: "success",
        data: {
          ...savedQuestion?._doc,
          sectionPosition: req.body.sectionIndex,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Failed", message: "Failed! " + err.message });
  }
};

const getSurveyGuidedSelling = async (req, res) => {
  if (req.user) {
    let user_id, people_id;

    if (req.user.admin_id) {
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      user_id = req.user._id;
      people_id = null;
    }
    try {
      const survey_data = await Survey.find({
        user_id: user_id,
        catelogStatus: "PUBLISHED",
      });

      if (!survey_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "Loopups Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survey_data });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

const getSurveyQuestionsguidedSelling = async (req, res) => {
  if (req.user) {
    let user_id, people_id;

    if (req.user.admin_id) {
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      user_id = req.user._id;
      people_id = null;
    }
    var { survey_key, section_key } = req.body;

    try {
      var survery_data = [];

      survery_data = await SurveyQuestion.find({
        user_id: user_id,
        survey_key: survey_key,
      });

      if (!survery_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "survey Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survery_data });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

const getSurveyNames = async (req, res) => {
  if (req.user) {
    // const user_id = req.user._id;
    let user_id, people_id;

    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }
    var { survey_key } = req.body;
    var { title } = req.body;
    try {
      const survey = await Survey.find({
        user_id: user_id,
        survey_key: survey_key,
        title: title,
      });

      if (!survey) {
        res
          .status(200)
          .json({ status: "Failed", message: "Survey Name is not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survey });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

module.exports = {
  addSurvey,
  getSurvey,
  deleteSurvey,
  addSurveySections,
  deleteSurveySection,
  addSurveyQuestions,
  deleteSurveyQuestions,
  getSurveyGuidedSelling,
  getSurveyQuestionsguidedSelling,
  getSurveyNames,
  getSurveyDetailsById,
};
