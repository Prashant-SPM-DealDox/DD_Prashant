const moment = require('moment')
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
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
  });

  return User;
};
