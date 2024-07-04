const moment = require('moment');
const db = require('../models');
const User = db.user;

module.exports = (sequelize, Sequelize) => {
    const support = sequelize.define('support', {
        support_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrrement: true
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        customer_token:{
            type: Sequelize.STRING
        },
        first_name:{
            type: Sequelize.STRING
        },
        last_name:{
            type: Sequelize.STRING
        },
        customer_email:{
            type: Sequelize.STRING
        },
        contact_number:{
            type: Sequelize.STRING
        },
        department:{
            type: Sequelize.STRING
        },
        issue:{
            type: Sequelize.STRING
        },
        summary:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        priority:{
            type: Sequelize.STRING
        },
        contact_typeEmail:{
            type: Sequelize.STRING
        },
        contact_typeNumber:{
            type: Sequelize.STRING
        },
        permission_access:{
            type: Sequelize.STRING
        },
        prefered_date:{
            type: Sequelize.STRING
        },
        prefered_time:{
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE,
            get() {
              return moment(this.getDataValue('createdAt')).format('DD-MM-YYYY h:m:ss');
            }
          }
    });

    return support;
};