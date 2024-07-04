const moment = require('moment');
module.exports = (sequelize, Sequelize) => {
var ROLES_SETUP_SCHEMA = {};
ROLES_SETUP_SCHEMA.ROLES_SETUP = {
    roles_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    roles_key: {
        type: Sequelize.STRING
    },
    role_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_catalog_category: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_catalog_status: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_group: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_practice: {
        type: Sequelize.STRING,
        allowNull: true
    },
    parent_role: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_external_ref: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_prohibit_discount: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    role_category_1: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_category_2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_category_3: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_category_4: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_category_5: {
        type: Sequelize.STRING,
        allowNull: true
    },
    role_category_6: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).format('DD-MM-YYYY h:m:ss');
        }
      },
      modifiedAt: {
        type: Sequelize.DATE,
        get() {
          return moment(this.getDataValue('modifiedAt')).format('DD-MM-YYYY h:m:ss');
        }
      }
};
return ROLES_SETUP_SCHEMA;
}
