var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CONFIG_SCHEMA = {};
CONFIG_SCHEMA.CONFIG = {

  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dd_admin',
  },
  value1: {
    type: String,
  },
  value2: {
    type: String,
  },
  value3: {
    type: String,
  },
  value4: {
    type: String,
  },
  value5: {
    type: String,
  },
  value6: {
    type: String,
  },
  value7: {
    type: String,
  },
  value8: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  }
};
module.exports = CONFIG_SCHEMA;
