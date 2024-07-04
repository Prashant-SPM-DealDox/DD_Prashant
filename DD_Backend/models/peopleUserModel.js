const mongoose = require('mongoose');
const User = require('../models/adminModel');

const Schema = mongoose.Schema

const PeopleUserSchema = new Schema ({

    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admin',
      },
      people_email:{
        type: String,
      },
      securityRole:{
        type: String,
      },
      password:{
        type: String,
      },
      createdAt: {
        type: Date,
        default: new Date(),
    },
    modifiedAt: {
        type: Date,
        default: new Date(),
    },

});

module.exports = mongoose.model('dd_peopleuser', PeopleUserSchema);