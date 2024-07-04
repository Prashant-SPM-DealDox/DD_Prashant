const mongoose = require('mongoose');
const Schema = mongoose.Schema
// const User =require('../models/adminModel')

const contentSchema = new Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dd_admin',
  },
  content_name: {
    type: String,
  },
  sales_org: {
    type: String,
  },
  catalog_number: {
    type: Number,
  },
  catalog_category: {
    type: String,
  },
  locked: {
    type: Boolean,
  },
  content: {
    type: String,
  },
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
});


module.exports = mongoose.model('dd_contents', contentSchema);

