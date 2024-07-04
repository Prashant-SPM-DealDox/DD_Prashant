const moment = require('moment');
const db = require('../models');
const User = db.user;

module.exports = (sequelize, Sequelize) => {

    const PeopleData = sequelize.define("peopleData", {
        peopleData_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        peoplelogin_Key: {
            type: Sequelize.STRING,
            required: true,
        },
        people_email: {
            type: Sequelize.STRING,
            required: true,
        },
        people_securityRole: {
            type: Sequelize.STRING,
        },
        people_password: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('DD-MM-YYYY h:m:ss')
            }
        },
        modifiedAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('modifiedAt')).format('DD-MM-YYYY h:m:ss')
            }
        },

    });
    return PeopleData;
};