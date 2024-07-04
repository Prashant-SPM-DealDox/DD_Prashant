var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SURVEY_FORMULA_SCHEMA = {};
SURVEY_FORMULA_SCHEMA.SURVEY_FORMULA = {
   
    survey_key: {
        type: String,
    },
    survey_section_key: {
        type: String,
    },
    survey_question_key: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admins', // Assuming 'users' is the name of the users collection
        required: true,
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
module.exports = SURVEY_FORMULA_SCHEMA;
