const md5 = require("md5");
const SurveySections = require('../models/surveySectionsModel');
const SurveyQuestions = require('../models/surveyQuestionsModel');
// const DocumentModel = require('../models/calcModel');
const CalcModel = require('../models/calcModel');
const GuidedSellingAns = require('../models/guidedQuestionsModel');


// SPREAD SHEET  DATA DISPLAY

const getCatalogQuestions = async (req, res) => {
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
    // const position = req.params.position;
    // const questionPositions = req.body.position;
    const survey_key = req.body.survey_key;


    try {
        const section_data = await SurveySections.find({
            user_id: user_id,
            surveyId: survey_key,
        });
        const question_data = await SurveyQuestions.find({
            user_id: user_id,
            // questionPosition: { $in: questionPositions },
            surveyId: survey_key,
        });

        if (!question_data || question_data.length === 0) {
            res.status(200).json({ status: "Failed", message: "Question Data Not Found" });
        } else {
            res.status(200).json({ data: section_data, question_data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed" });
    }
}
// const getByPosition = async (req, res) => {
//     const user_id = req.user.user_id;
//     const survey_questions_id = req.params.survey_questions_id;
//     console.log(user_id);
//     console.log(survey_questions_id);

//     try {
//         const byPosition = await SurveyQuestions.findAll({
//             where: {
//                 user_id: user_id,
//                 survey_questions_id: survey_questions_id,
//             },
//         });

//         if (!byPosition || byPosition.length === 0) {
//             res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
//         } else {
//             res.status(200).json({ data: byPosition });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed" });
//     }
// }

// Update the route to accept GET requests

const getAnswerByQuestionId = async (req, res) => {
    // const user_id = req.user._id;
    const questions_key = req.body.questionKey;
    const survey_key = req.body.survey_key;
    try {
        const byQuestionId = await GuidedSellingAns.find({
            // user_id: user_id,
            survey_key: survey_key,
            // question_key: { $in: questions_key }, 
            
        });
        if (!byQuestionId) {
            res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
        } else {
            res.status(200).json({ data: byQuestionId });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed" });
    }
}

const saveCalcData = async (req, res) => {
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
    const { spreadsheetData } = req.body;
    const survey_key = req.body.survey_key;
    console.log("Received data:", spreadsheetData);
    try {
        const existingData = await CalcModel.findOne({
            user_id: user_id,
            survey_key: survey_key,
        });
        if (existingData) {
            const updatedData = await CalcModel.findOneAndUpdate(
                {
                    user_id: user_id,
                    survey_key: survey_key,
                },
                { $set: { data: JSON.stringify(spreadsheetData) } },
                { new: true }
            );

            console.log("UPDATED DATA: " + updatedData);
            if (updatedData) {
                res.status(200).json({ success: "Data Updated Successfully" });
            } else {
                res.status(200).json({ success: "Unable to Update Data" });
            }
        } else {
            const result = await CalcModel.create({ user_id, survey_key, data: JSON.stringify(spreadsheetData) });
            res.status(200).json({ message: 'Data saved successfully', result });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

// Get all calc data
const getAllCalcData = async (req, res) => {
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
    const survey_key = req.body.survey_key;
    console.log("SURVEY KEY BANTHA : " + survey_key);
    try {
        const data = await CalcModel.find({
            user_id: user_id,
            survey_key: survey_key,
        });
        res.status(200).json({ data });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}




module.exports = { getCatalogQuestions, getAnswerByQuestionId, saveCalcData, getAllCalcData }

//getCatalogQuestions  getByPosition, ,


// const getCatalogQuestions = async (req, res) => {
//     // const user_id = req.user.user_id;
//     const questionId = req.params.position;

//     console.log(user_id);
//     console.log(questionId);

//     try {
//         const question_data = await SurveyQuestions.findAll({ where: {
//             // user_id: user_id,
//             survey_questions_id: questionId
//         } });

//         if (!question_data || question_data.length === 0) {
//             res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
//         } else {
//             res.status(200).json({ data: question_data });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed" });
//     }
// }