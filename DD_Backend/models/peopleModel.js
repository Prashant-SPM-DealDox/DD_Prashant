const mongoose = require('mongoose');
// const Admin = require('../models/adminModel');

const Schema = mongoose.Schema

const PeopleSchema = new Schema({

    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admin',
    },
    profile_id: {
        type: Number,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    title: {
        type: String,
    },
    uid: {
        type: String,
    },
    emp_id: {
        type: String,
    },
    emp_ref_id: {
        type: String,
    },
    start_date: {
        type: String,
    },
    end_date: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    src_sys_usr_name: {
        type: String,
    },
    city: {
        type: String,
    },
    region: {
        type: String,
    },
    country: {
        type: String,
    },
    practice: {
        type: String,
    },
    org: {
        type: String,
    },
    manager: {
        type: String,
    },
    year_of_exp: {
        type: String,
    },
    year_of_tenure: {
        type: String,
    },
    crm_status: {
        type: String,
    },
    contractor: {
        type: Boolean,
        default: "false"
    },
    supplier: {
        type: String,
    },
    currency: {
        type: String,
    },
    cost_per_hour: {
        type: Number,
    },
    week_hour: {
        type: Number,
    },
    access: {
        type: String,
    },
    catalog_role: {
        type: [String], // Change the type to an array of strings
    },
    api_intgr_access: {
        type: Boolean,
        default: "false"
    },
    sso_user: {
        type: Boolean,
        default: "false"
    },
    pass_exp_date: {
        type: String
    },
    time_zone: {
        type: String
    },
    language: {
        type: String
    },
    Notification: {
        type: String
    },
    password: {
        type: String,
    },
    status:{
        type: Boolean,
        default: "false"
    },
    securityRole: {
        type: String,
    },
    secret_key: {
        type: String
    },
    first_time_login: {
        type: Boolean,
        default: "false"
    },
    mobilefirst_login: {
        type: Boolean,
        default: "false"
    },
    revision: {
        type: Number,
        default: 0,
    },
    generatedPin: {
        type: Number,
        default: 0
    },
    created_by: {
        type: String
    },
    modified_by: {
        type: String
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    modified_at: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('dd_people', PeopleSchema);