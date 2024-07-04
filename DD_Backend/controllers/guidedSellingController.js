const moment = require("moment");
const md5 = require("md5"); // Make sure to import the md5 library
const GuidedSellingQuestions = require("../models/guidedQuestionsModel");
const GuidedSellingSection = require("../models/guidedSectionModel");
const Quotes = require("../models/quotesModel");
const GuidedRules = require("../models/rulesModel.guided");
const mongoose = require("mongoose");

//add GuidedSection
const addGuidedSection = async (req, res) => {
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
      await GuidedSellingSection.findByIdAndUpdate(_id, req.body);
      res.status(200).json({
        status: "success",
        data: req.body,
        message: "Guided section updated",
      });
    } else {
      const newSection = await GuidedSellingSection.create({
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
//add GuidedQuestion
const addGuidedQuestion = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "failed", message: "Authorization failed" });
    }

    const user_id = req.user._id;
    const { _id, surveySectionId } = req.body;

    if (_id) {
      // If updating an existing question
      const existingQuestion = await GuidedSellingQuestions.findById(_id);

      if (!existingQuestion) {
        return res
          .status(404)
          .json({ status: "failed", message: "Question not found" });
      }

      // Preserve the original questionPosition
      const originalPosition = existingQuestion.questionPosition;

      // Update other fields, but not questionPosition
      await GuidedSellingQuestions.findByIdAndUpdate(_id, {
        $set: req.body,
        questionPosition: originalPosition,
      });

      res.status(200).json({
        status: "success",
        message: "Question updated",
      });
    } else {
      // If _id is not provided, it's the creation of new data
      const newQuestion = new GuidedSellingQuestions({
        user_id,
        ...req.body,
      });

      // Set the section ID for the new question
      newQuestion.surveySectionId = surveySectionId;

      // Find the last question globally
      const lastPosition = await GuidedSellingQuestions.findOne({
        guidedId: newQuestion.guidedId,
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
      const existingQuestions = await GuidedSellingQuestions.find({
        guidedId: newQuestion.guidedId,
      })
        .sort({ surveySectionId: 1, questionPosition: 1 })
        .exec();

      for (let i = 0; i < existingQuestions.length; i++) {
        const existingQuestion = existingQuestions[i];
        const newPosition = i;

        if (existingQuestion.questionPosition !== newPosition) {
          await GuidedSellingQuestions.findByIdAndUpdate(existingQuestion._id, {
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
//Add guidedrules
const addGuidedRules = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!req.user) {
      res.json(401).json({
        message: "Not Authenticated",
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
    if (_id) {
      const allRules = await GuidedRules.findById({ _id });
      if (allRules) {
        await GuidedRules.findByIdAndUpdate(_id, req.body);
        res.status(200).json({
          data: req.body,
          message: "Rules updated successfully",
        });
      }
    } else {
      const newRule = await GuidedRules.create({ user_id, ...req.body });
      res.status(200).json({
        data: newRule,
        message: "Rules created successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const getGuidedRules = async (req, res) => {
  try {
    const { sectionId, guidedId } = req.body;
    if (!req.user) {
      res.json(401).json({
        message: "Not Authenticated",
      });
    }

    const allRules = await GuidedRules.find({ sectionId, guidedId });
    res.status(200).json({
      data: allRules ? allRules : [],
      message: allRules.length > 0 ? "Fetched" : "No Data",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const getGuidedDetailsById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "Failed",
        message: "Authorization Failed",
      });
    }
    const { guidedId } = req.body;
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
    const quoteDetail = await Quotes.findOne({ _id: guidedId, user_id });

    let surveySections = await GuidedSellingSection.find({
      guidedId,
      user_id,
    }).sort({
      sectionPosition: 1,
    });

    let surveyQuestionsArr = [];

    if (surveySections.length > 0) {
      const promises = surveySections.map(async (sec) => {
        const surveySectionId = sec._id.toString();
        const surveyQuestions = await GuidedSellingQuestions.find({
          guidedId,
          surveySectionId,
          user_id,
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

    res.status(200).json({
      status: "Success",
      data: {
        surveySections: surveySections,
        surveyQuestions: surveyQuestionsArr,
        quoteDetail,
      },
      message: "Survey found",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Failed" });
  }
};
const deleteGuidedSellingSection = async (req, res) => {
  try {
    const { id, surveyId } = req.body;

    const rules = await GuidedRules.find({ sectionId: id });

    await Promise.all(
      rules.map(async (rule) => {
        await GuidedRules.findByIdAndDelete(rule._id);
      })
    );
    const sectionToDelete = await GuidedSellingSection.findByIdAndDelete(id);

    const positionToDelete = sectionToDelete.sectionPosition;

    await GuidedRules.deleteMany({ sectionId: id });
    const deletedQuestions = await GuidedSellingQuestions.deleteMany({
      surveySectionId: mongoose.Types.ObjectId(id),
    });
    const deletedQuestionsCount = deletedQuestions.deletedCount || 0;

    await GuidedSellingSection.updateMany(
      {
        sectionPosition: { $gt: positionToDelete },
        guidedId: mongoose.Types.ObjectId(surveyId),
      },
      { $inc: { sectionPosition: -1 } }
    );
    const remainingQuestions = await GuidedSellingQuestions.find({
      guidedId: sectionToDelete.guidedId,
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
    res.status(200).json({
      status: 200,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: null,
      message: err,
    });
  }
};
const deleteGuidedSellingQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await GuidedSellingQuestions.findById(id);
    const surveySectionId = deletedQuestion.surveySectionId;
    const guidedId = deletedQuestion.guidedId;

    await GuidedSellingQuestions.findByIdAndDelete(id);
    await GuidedSellingQuestions.updateMany(
      {
        guidedId: guidedId,
        questionPosition: { $gt: deletedQuestion.questionPosition }
      },
      { $inc: { questionPosition: -1 } }
    );
    // Get all questions in the same survey section and with position greater than the deleted question
    // const questionsToUpdate = await GuidedSellingQuestions.find({
    //   surveySectionId: surveySectionId,
    //   questionPosition: { $gt: deletedQuestion.questionPosition },
    // });

    // Update the position and index of the remaining questions
    // for (const question of questionsToUpdate) {
    //   question.questionPosition -= 1;
    //   question.questionIndex -= 0.1;
    //   await question.save();
    // }

    // // Round the question index values
    // await GuidedSellingQuestions.updateMany(
    //   { surveySectionId: surveySectionId },
    //   [
    //     {
    //       $set: {
    //         questionIndex: { $round: [{ $toDouble: "$questionIndex" }, 1] },
    //       },
    //     },
    //   ]
    // );
    res.status(200).json({
      status: 200,
      message: "Question has been deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: null,
      message: err,
    });
  }
};
const saveGuidedAnswers = async (req, res) => {
  try {
    if (!req.user) {
      res.json(401).json({
        message: "Not Authenticated",
      });
    }
    const answers = req.body;
    if (Array.isArray(answers) && answers.length > 0) {
      const promises = answers.map(async (answer) => {
        await GuidedSellingQuestions.findOneAndUpdate(
          { _id: answer.questionId },
          { answer: answer.value }
        );
      });
      await Promise.all(promises);
      res.status(200).json({
        status: "Success",
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Invalid Answers",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
};

module.exports = {
  getGuidedRules,
  addGuidedRules,
  getGuidedDetailsById,
  deleteGuidedSellingQuestion,
  deleteGuidedSellingSection,
  addGuidedQuestion,
  addGuidedSection,
  saveGuidedAnswers,
};
