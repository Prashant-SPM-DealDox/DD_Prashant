var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TEMPLATE_SCHEMA = {};
TEMPLATE_SCHEMA.TEMPLATE = {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dd_admin',
    },
    quote_name: {
      type: String,
    },
    description: {
      type: String,
    },
    catalog_category:{
      type:String,
    },
    status:{
      type:String,
    },
    doc_tempData: [
      {
        doc_name: {
          type: String,
        },
        sections: [
          {
            section_name: {
              type: String,
            },
            section_tag: {
              type: String,
              
          },
            section_value: [
              {
                key: {
                  type: Number,
                },
                value: {
                  type: String,
                },
                
              }
            ],
          }
        ],
      }
    ],
    revision: {
      type: Number,
      default: 0,
    },
    created_by: {
      type: String,
    },
    modified_by: {
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
module.exports = TEMPLATE_SCHEMA;
