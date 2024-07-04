var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CALC_SCHEMA = {};
CALC_SCHEMA.CALC = {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dd_admin',
  },
  survey_key: {
    type: String,
  },
  data: String,

};
module.exports = CALC_SCHEMA;
