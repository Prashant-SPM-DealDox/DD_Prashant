const mongoose = require('mongoose');
const Schema = mongoose.Schema
// const User = require('../models/adminModel');
const CompanyOrgSchema = new Schema({

    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dd_admin',
    },
    org_name: {
      type: String
    },
    active: {
      type:Boolean,
      default:false
    },
    org_code: {
      type: String 
    },
    external_reference: {
        type: String
    },
    parent_org: {
        type: String 
    },
    org_type: {
        type: String  
    },
    default_time_uom: {
        type: String 
    },
    week_hours: {
        type:String
    },
    languages: {
        type: String 
    },
    currency: {
        type: String   
    },
    cola: {
        type:String
    },
    pola: {
        type:String 
    },
    cost_read_only: {
        type:Boolean  
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
module.exports = mongoose.model('dd_CompanyOrg', CompanyOrgSchema);
