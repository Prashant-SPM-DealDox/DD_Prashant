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
  survey_key: {
    type: String,
  },
  data: String,



  // name: String,
//   isSelected: Boolean,
//   activeRow: Number,
//   activeCol: Number,
//   visible: Number,
//   theme: String,
//   data: {
//     dataTable: {
//       type: dataTableSchema,
//       default: {},
//     },
//     defaultDataNode: {
//       style: {
//         themeFont: String,
//       },
//     },
//   },
//   rowHeaderData: {
//     defaultDataNode: {
//       style: {
//         themeFont: String,
//       },
//     },
//   },
//   colHeaderData: {
//     defaultDataNode: {
//       style: {
//         themeFont: String,
//       },
//     },
//   },
//   columns: [
//     {
//       size: Number,
//     },
//   ],
//   defaultData: {},
//   leftCellIndex: Number,
//   topCellIndex: Number,
//   selections: {
//     type: {
//       row: Number,
//       col: Number,
//       rowCount: Number,
//       colCount: Number,
//     },
//     length: Number,
//   },
//   rowOutlines: {
//     items: [],
//   },
//   columnOutlines: {
//     items: [],
//   },
//   cellStates: {},
//   states: {},
//   outlineColumnOptions: {},
//   autoMergeRangeInfos: [],
//   index: Number,
//   order: Number,
// });

// // Define the main schema for the entire document
// const documentSchema = new Schema({
//   version: String,
//   name: String,
//   sheetCount: Number,
//   allowExtendPasteRange: Boolean,
//   customList: [],
//   sheets:[ {
    
//   }],
//   sheetTabCount: Number,
//   namedPatterns: {},
//   customFunctions: {
//     QUESTION_INDEX: {
//       name: String,
//       minArgs: Number,
//       maxArgs: Number,
//       IDt: {
//         name: String,
//         description: String,
//       },
//       typeName: String,
//     },
//     GET_QUESTION_ID: {
//       name: String,
//       minArgs: Number,
//       maxArgs: Number,
//       IDt: {
//         name: String,
//         description: String,
//       },
//       typeName: String,
//     },
//     ANSWER_BY_ID: {
//       name: String,
//       minArgs: Number,
//       maxArgs: Number,
//       IDt: {
//         name: String,
//         description: String,
//       },
//       typeName: String,
//     },
//   },
});

// Create the mongoose model
module.exports = mongoose.model('dd_calc_engine', sheetSchema);


