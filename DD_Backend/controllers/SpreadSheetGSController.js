const SurveyGuidedQuestions = require('../models/guidedQuestionsModel');
const GuidedSections = require('../models/guidedSectionModel');
const CalcModelGS = require('../models/calcModelGS');
const surveyCalcData = require('../models/calcModel');

// SPREAD SHEET  DATA DISPLAY

const getGuidedSellingQuestions = async (req, res) => {
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
    // const questionId = req.body.position;
    const quoteId = req.body.quoteId;

    try {
        const section_data = await GuidedSections.find({
            user_id: user_id,
            guidedId: quoteId,
        })
        const question_data = await SurveyGuidedQuestions.find({
            user_id: user_id,
            // questionPosition: questionId,
            guidedId: quoteId,
        });

        if (!question_data || question_data.length === 0) {
            res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
        } else {
            res.status(200).json({ data: section_data, question_data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed" });
    }
}



// Update the route to accept GET requests

const getAnswerByQuestionIdGS = async (req, res) => {
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
    const questions_key = req.body.questionKey;
    const quote_key = req.body.quoteId;

    try {
        const byQuestionId = await SurveyGuidedQuestions.find({
            // user_id: user_id,
            guidedId: quote_key,
            // _id: questions_key,
            // $or: [
            // {surveyQuestionId: questions_key},
            // {_id: questions_key},
            // ]
            
        });
        if (!byQuestionId) {
            res.status(200).json({ status: "Failed", message: "Answer Not Found" });
        } else {
            res.status(200).json({ data: byQuestionId });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed" });
    }
}

const saveCalcDataGS = async (req, res) => {
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
    const quote_key = req.body.quoteId;
    const survey_key = req.body.surveyId;
    try {
        const existingData = await CalcModelGS.findOne({
            user_id: user_id,
            guidedId: quote_key,
        });
        if (existingData) {
            const updatedData = await CalcModelGS.findOneAndUpdate(
                {
                    user_id: user_id,
                    guidedId: quote_key,
                },
                { $set: { data: JSON.stringify(spreadsheetData) } },
                { new: true }
            );
            if (updatedData) {
                res.status(200).json({ success: "Data Updated Successfully" });
            } else {
                res.status(200).json({ success: "Unable to Update Data" });
            }
        } else {
            const result = await CalcModelGS.create({ user_id, guidedId : quote_key, surveyId: survey_key, data: JSON.stringify(spreadsheetData) });
            res.status(200).json({ message: 'Data saved successfully', result });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

// Get all calc data
// Get all calc data
const getAllCalcDataGS = async (req, res) => {
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
    const quote_key = req.body.quoteId;
    const survey_key = req.body.surveyId;
    try {
        const data = await CalcModelGS.find({
            user_id: user_id,
            guidedId: quote_key,
            surveyId: survey_key,
        });
        const parentCalc = await surveyCalcData.find({
            survey_key: survey_key,
        });
        res.status(200).json({ data });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}





module.exports = { getGuidedSellingQuestions, getAnswerByQuestionIdGS, saveCalcDataGS, getAllCalcDataGS }

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