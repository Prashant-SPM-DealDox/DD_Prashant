const Action = require("../models/actionModel");
// const admin = require("../models/adminModel");
const survey = require("../models/surveyQuestionsModel");
// add action data
const addAction = async (req, res) => {
    const admin_id = req.user._id;
    //   const survey_id = req.survey._id;
    // var d = Date();
    // var a = d.toString();
    const { survey_key, section_key, actionCount, action, template } = req.body;
    try {
        const action_data = await Action.create({
            survey_key,
            // section_key,
            admin_id,
            actionCount,
            action,
            template,
        });
        if (action_data) {
            res.status(200).json({ success: "Success" });
        } else {
            res.status(200).json({ error: "failed" });
        }
    } catch (error) {
        res.status(200).json({ error: "failed" });
    }
};

const getAction = async (req, res) => {
    const admin_id = req.user._id;
    const { survey_key } = req.body();
    try {
        const action_data = await Action.find({
            admin_id: admin_id,
            survey_key: survey_key,
        });

        if (!action_data) {
            res
                .status(200)
                .json({ status: "Failed", message: "action_data Data Not Found" });
        } else {
            res.status(200).json({ data: action_data });
        }
    } catch (error) {
        res.status(200).json({ error: "Failed" });
    }
};


const templateMergeData = async (req, res) => {
    const admin_id = req.user._id;
    const { survey_key } = req.body; // Destructure survey_key from req.body
    const template = "TEMPLATE MERGE";

    try {
        const action_data = await Action.find({
            admin_id: admin_id,
            survey_key: survey_key, // Use survey_key directly
            action: template
        });
        if (action_data) {
            res.status(200).json({ data: action_data });
        } else {
            res.status(200).json({ status: "Failed", message: "action_data Data Not Found" });
        }

    } catch (error) {
        res.status(400).json({ error: "Failed" });
    }
}



module.exports = { addAction, getAction, templateMergeData };
