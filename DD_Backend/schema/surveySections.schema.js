var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SURVEY_SECTIONS_SCHEMA = {};
SURVEY_SECTIONS_SCHEMA.SURVEY_SECTIONS = {
    
    survey_key: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Assuming 'users' is the name of the users collection
        required: true,
    },
    survey_section_number: {
        type: String,
        required: true,
    },
    survey_section_title: {
        type: String,
        required: true,
    },
    survey_section_status: {
        type: Number,
        required: true,
        default: 0,
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
module.exports = SURVEY_SECTIONS_SCHEMA;
