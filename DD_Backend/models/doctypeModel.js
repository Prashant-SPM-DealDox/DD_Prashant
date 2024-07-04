const mongoose = require("mongoose");
const schema = mongoose.Schema;
// const User = require("../models/adminModel");

const doctypeModelSchema = new schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dd_admin",
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
  sectionData: {
    type: String,
  },
  createdAt: {
    type: Date,
    //required: true,
  },
  updatedAt: {
    type: Date,
  },
});

//const doctypeModel = mongoose.model("dd_doctype", doctypeModelSchema);
module.exports = mongoose.model("dd_doctype", doctypeModelSchema);
