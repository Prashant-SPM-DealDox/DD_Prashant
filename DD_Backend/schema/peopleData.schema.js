var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = (sequelize, Sequelize) => {
var PEOPLE_DATA_SCHEMA = {};
PEOPLE_DATA_SCHEMA.PEOPLE_DATA = {
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

};
return PEOPLE_DATA_SCHEMA;
}
