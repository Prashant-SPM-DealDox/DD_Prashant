const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newInfo = new Schema({
    newInfoData : {
        type : String
    }
});

module.exports = mongoose.model('dd_newInfo', newInfo)