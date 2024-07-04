var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SURVEY_QUESTIONS_SCHEMA = {};
SURVEY_QUESTIONS_SCHEMA.SURVEY_QUESTIONS = {
    survey_section_key: {
        type: String,
    },
    survey_key: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admins', // Assuming 'users' is the name of the users collection
        required: true,
    },
    survey_questions_num: {
        type: String,
    },
    survey_questions_name: {
        type: String,
    },
    survey_questions_required: {
        type: Number,
        default: 0,
    },
    survey_questions_toggle: {
        type: String,
    },
    questions_note: {
        type: String,
    },
    questions_category: {
        type: String,
    },
    questions_external_reference_id: {
        type: String,
    },
    questions_link_to_question: {
        type: String,
    },
    question_position: {
        type: Number,
    },
    formula_add_filed: {
        type: String,
    },
    formula_add_operator: {
        type: String,
    },
    formula_add_function: {
        type: String,
    },
    formula_evaluate: {
        type: Boolean,
    },
    formula_add_formula: {
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
};
module.exports = SURVEY_QUESTIONS_SCHEMA;
