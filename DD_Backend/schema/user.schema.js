var mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports = (sequelize, Sequelize) => {
var USER_SCHEMA = {};
USER_SCHEMA.USER = {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING
    },
    job_title: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    no_of_employees: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
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
  };
return USER_SCHEMA;
}
