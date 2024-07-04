var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var COMPANYORG_SCHEMA = {};
COMPANYORG_SCHEMA.COMPANYORG = {

    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admin',
    },
    org_name: {
        type: String
    },
    active: {
        type: Boolean
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
        type: Number
    },
    languages: {
        type: String
    },
    currency: {
        type: String
    },
    cola: {
        type: Number
    },
    pola: {
        type: Number
    },
    cost_read_only: {
        type: Boolean
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
};
module.exports = COMPANYORG_SCHEMA;
