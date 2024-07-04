var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ADDINFO_SCHEMA = {};
ADDINFO_SCHEMA.ADDINFO = {
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dd_admin",
      },
      dynamicFields: [{
        id: String, 
        value: String, 
        dropdownValue: String,
        persistOnApply: Boolean,
        adminOnly: Boolean,
        readOnly: Boolean,
      }],
      createdAt: {
        type: Date,
        default: new Date(),
      },
      modifiedAt: {
        type: Date,
        default: new Date(),
      },
    };
module.exports = ADDINFO_SCHEMA;
