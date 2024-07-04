const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the nested schema for the dataTable
// const dataTableSchema = new Schema({}, { strict: false });

// Define the main schema for each sheet
const sheetSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dd_admin',
  },
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  guidedId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  data: String,
});

// Create the mongoose model
module.exports = mongoose.model('dd_calc_engine_GS', sheetSchema);