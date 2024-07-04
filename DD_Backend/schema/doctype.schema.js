var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var DOCTYPE_SCHEMA = {};
DOCTYPE_SCHEMA.DOCTYPE = {
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dd_admin',
  },
    doc_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    template_file: {
        type: String,
    },
    paper_size: {
        type: String,
    },
    watermark_file: {
        type: String,
    },
    watermark: {
        type: Boolean,
    },
    toc: {
        type: Boolean,
    },
    templateFilePath: {
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
        },
    ],
    sectionData : {
        type: String,
    },
    createdAt: {
        type: Date,
        //required: true,
    },
    updatedAt: {
        type: Date,
    },   
};
module.exports = DOCTYPE_SCHEMA;
