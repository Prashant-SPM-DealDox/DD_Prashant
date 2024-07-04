// const mongoose = require('mongoose');
// const moment = require('moment');

// const Schema = mongoose.Schema;

// const SurveyFormulaSchema = new Schema({
   
//     survey_key: {
//         type: String,
//     },
//     survey_section_key: {
//         type: String,
//     },
//     survey_question_key: {
//         type: String,
//     },
//     user_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'dd_admins', // Assuming 'users' is the name of the users collection
//         required: true,
//     },
//     formula_add_filed: {
//         type: String,
//     },
//     formula_add_operator: {
//         type: String,
//     },
//     formula_add_function: {
//         type: String,
//     },
//     formula_evaluate: {
//         type: Boolean,
//     },
//     formula_add_formula: {
//         type: String,
//     },
//     createdAt: {
//         type: Date,
//         default: new Date(),
//     },
//     modifiedAt: {
//         type: Date,
//         default: new Date(),
//     },
// });

// module.exports = mongoose.model('dd_survey_formula', SurveyFormulaSchema)