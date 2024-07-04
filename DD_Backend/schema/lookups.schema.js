var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var LOOKUPS_SCHEMA = {};
LOOKUPS_SCHEMA.LOOKUPS = {

    user_id:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dd_admin',
    },
    class_name:
    {
      type: String,
    },
    parent_lookup:
    {
      type: String,
    },
    lookupOptions: [
      {
        lookups_name: {
          type: String,
        },
        code: {
          type: String,
        },
        value1: {
          type: String,
        },
        value2: {
          type: String,
        },
        disable: {
          type: Boolean,
          default: false,
        },
        parent_lookup_data: {
          type: String,
        }
      }
    ],
    createdAt:
    {
      type: Date,
      default: new Date(),
    },
    modifiedAt:
    {
      type: Date,
      default: new Date(),
    },
  };
module.exports = LOOKUPS_SCHEMA;
