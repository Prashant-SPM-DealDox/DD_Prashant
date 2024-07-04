const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, Sequelize);
db.accounts = require("./accountsModel")(sequelize, Sequelize);
db.opportunity = require("./opportunityModel")(sequelize, Sequelize);
db.company = require("./companyModel")(sequelize, Sequelize);
db.config = require('./configModel.js')(sequelize, Sequelize);
db.doctype = require("./doctypeModel.js")(sequelize, Sequelize).Doctype;
db.section = require("./doctypeModel.js")(sequelize, Sequelize).Section;
db.template = require("./templateModel.js")(sequelize, Sequelize);
db.people = require("./peopleModel.js")(sequelize, Sequelize);
db.security = require("./securityModel.js")(sequelize, Sequelize);
db.rolesSetup = require("./rolesSetupModel.js")(sequelize, Sequelize);
db.content = require("./contentModel.js")(sequelize, Sequelize);
db.lookups = require("./lookupsModel")(sequelize, Sequelize);
db.lookups_data = require("./lookups_dataModel")(sequelize, Sequelize);
db.survey = require("./surveyModel.js")(sequelize, Sequelize);
db.surveyQuestions = require("./surveyQuestionsModel.js")(sequelize, Sequelize);
db.surveySections = require("./surveySectionsModel.js")(sequelize, Sequelize);
db.surveyRules = require("./surveyRulesModel.js")(sequelize, Sequelize);
db.surveyActions = require("./surveyActionsModel.js")(sequelize, Sequelize);
db.guidedSellingQuestions = require("./guidedQuestionsModel.js")(sequelize, Sequelize);
db.guidedselling_sections = require("./guidedSectionModel.js")(sequelize, Sequelize);
db.support = require("./helpModel.js")(sequelize, Sequelize);
db.peopleData = require("./peopleDataModel.js")(sequelize, Sequelize);
db.quotes = require("./quotesModel")(sequelize, Sequelize);




module.exports = db, sequelize;
