const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SalesForceSchema = new Schema({

    auth_method:{
        type:String
    },
    backgroundSync:{
        type:String
    },
    client_id:{
        required:true,
        type:String
    },
    secret_client_id:{
        required:true,
        type:String
    },
    bg_sync_default_usr:{
        type:String
    },
    use_bg_usr_only:{
        type:String
    },
    login_url:{
        type:String
    },
    domain_url:{
        type:String
    },
    lightning_exp:{
        type:String
    },
    opp_icon_link:{
        type:String
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

module.exports = mongoose.model('dd_salesForce', SalesForceSchema)