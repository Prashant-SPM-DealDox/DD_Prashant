var mongoose = require('mongoose');

/*---new db schema----*/
var config_accounts_schema = require('../schema/accounts.schema.js');
var config_actions_schema = require('../schema/actions.schema.js');
var config_admin_schema = require('../schema/admin.schema.js');
var config_addInfo_schema = require('../schema/addInfo.schema.js');
var config_companyorg_schema = require('../schema/companyorg.schema.js');
var config_calc_schema = require('../schema/calc.schema.js');
var config_company_schema = require('../schema/company.schema.js');
var config_schema = require('../schema/config.schema.js');
var config_content_schema = require('../schema/content.schema.js');
var config_doctype_schema = require('../schema/doctype.schema.js');
var config_guided_questions_schema = require('../schema/guidedQuestions.schema.js');
var config_guided_section_schema = require('../schema/guidedSection.schema.js');
var config_lookups_schema = require('../schema/lookups.schema.js');
var config_opportunity_schema = require('../schema/opportunity.schema.js');
var config_people_schema = require('../schema/people.schema.js');
var config_peopleData_schema = require('../schema/peopleData.schema.js');
var config_peopleUser_schema = require('../schema/peopleUser.schema.js');
var config_quotes_schema = require('../schema/quotes.schema.js');
var config_roles_schema = require('../schema/roles.schema.js');
//  var config_rolesSetup_schema = require('../schema/rolesSetup.schema.js');
var config_security_schema = require('../schema/security.schema.js');
var config_survey_schema = require('../schema/survey.schema.js');
//  var config_surveyActions_schema = require('../schema/surveyActions.schema.js');
var config_surveyFormula_schema = require('../schema/surveyFormula.schema.js');
var config_surveyQuestions_schema = require('../schema/surveyQuestions.schema.js');
//  var config_surveyRules_schema = require('../schema/surveyRules.schema.js');
var config_surveySections_schema = require('../schema/surveySections.schema.js');
var config_template_schema = require('../schema/template.schema.js');
var config_UnApprovedUsers_schema = require('../schema/UnApprovedUsers.schema.js');
// var config_user_schema = require('../schema/user.schema.js');

// define the schema for our user model
var accountsSchema = mongoose.Schema(config_accounts_schema.ACCOUNTS, { timestamps: true, versionKey: false });
var adminSettingsSchema = mongoose.Schema(config_actions_schema.ACTIONS, { timestamps: true, versionKey: false });
var adminSchema = mongoose.Schema(config_admin_schema.ADMIN, { timestamps: true, versionKey: false });
var addInfoSchema = mongoose.Schema(config_addInfo_schema.ADDINFO, { timestamps: true, versionKey: false });
var CompanyOrgSchema = mongoose.Schema(config_companyorg_schema.COMPANYORG, { timestamps: true, versionKey: false });
var calcSchema = mongoose.Schema(config_calc_schema.CALC, { timestamps: true, versionKey: false });
var companySchema = mongoose.Schema(config_company_schema.COMPANY, { timestamps: true, versionKey: false });
var config_schema = mongoose.Schema(config_schema.CONFIG, { timestamps: true, versionKey: false });
var config_content_schema = mongoose.Schema(config_content_schema.CONTENT, { timestamps: true, versionKey: false });
var config_doctype_schema = mongoose.Schema(config_doctype_schema.DOCTYPE, { timestamps: true, versionKey: false })
var guidedQuestionsSchema = mongoose.Schema(config_guided_questions_schema.GUIDED_QUESTIONS, { timestamps: true, versionKey: false });
var guidedSectionSchema = mongoose.Schema(config_guided_section_schema.GUIDED_SECTION, { timestamps: true, versionKey: false });
var lookupsSchema = mongoose.Schema(config_lookups_schema.LOOKUPS, { timestamps: true, versionKey: false });
var opportunitySchema = mongoose.Schema(config_opportunity_schema.OPPORTUNITY, { timestamps: true, versionKey: false });
var peopleSchema = mongoose.Schema(config_people_schema.PEOPLE, { timestamps: true, versionKey: false });
var peopleDataSchema = mongoose.Schema(config_peopleData_schema.PEOPLE_DATA, { timestamps: true, versionKey: false });
var peopleUserSchema = mongoose.Schema(config_peopleUser_schema.PEOPLE_USER, { timestamps: true, versionKey: false });
var quotesSchema = mongoose.Schema(config_quotes_schema.QUOTES, { timestamps: true, versionKey: false });
var rolesSchema = mongoose.Schema(config_roles_schema.ROLES, { timestamps: true, versionKey: false });
// var rolesSetupSchema = mongoose.Schema(config_rolesSetup_schema.ROLES_SETUP, { timestamps: true, versionKey: false });
var securitySchema = mongoose.Schema(config_security_schema.SECURITY, { timestamps: true, versionKey: false });
var surveySchema = mongoose.Schema(config_survey_schema.SURVEY, { timestamps: true, versionKey: false });
//  var surveyActionsSchema = mongoose.Schema(config_surveyActions_schema.SURVEY_ACTIONS, { timestamps: true, versionKey: false });
var surveyFormulaSchema = mongoose.Schema(config_surveyFormula_schema.SURVEY_FORMULA, { timestamps: true, versionKey: false });
var surveyQuestionsSchema = mongoose.Schema(config_surveyQuestions_schema.SURVEY_QUESTIONS, { timestamps: true, versionKey: false });
//  var surveyRulesSchema = mongoose.Schema(config_surveyRules_schema.SURVEY_RULES, { timestamps: true, versionKey: false });
var surveySectionsSchema = mongoose.Schema(config_surveySections_schema.SURVEY_SECTIONS, { timestamps: true, versionKey: false });
var templateSchema = mongoose.Schema(config_template_schema.TEMPLATE, { timestamps: true, versionKey: false });
var unApprovedUsersSchema = mongoose.Schema(config_UnApprovedUsers_schema.UNAPPROVED_USERS, { timestamps: true, versionKey: false });
// var userSchema = mongoose.Schema(config_user_schema.USER, { timestamps: true, versionKey: false });

// methods ======================


// create the model for users and expose it to our app

var accounts = mongoose.model('dd_accounts', accountsSchema, 'dd_accounts');
var actions = mongoose.model('dd_survey_actions', adminSettingsSchema, 'dd_survey_actions');
var admin = mongoose.model('dd_admins', adminSchema, 'dd_admins');
var addInfo = mongoose.model('dd_addinfos', addInfoSchema, 'dd_addinfos');
var calc = mongoose.model('dd_calc_engines', calcSchema, 'dd_calc_engines');
var companyOrg = mongoose.model('dd_companyorgs', CompanyOrgSchema, 'dd_companyorgs')
var company = mongoose.model('dd_companies', companySchema, 'dd_companies');
var config = mongoose.model("dd_configs", config_schema, "dd_configs");
var content = mongoose.model("dd_contents", config_content_schema, "dd_contents");
var doctype = mongoose.model("dd_doctypes", config_doctype_schema, "dd_doctypes")
var guidedQuestions = mongoose.model('dd_guidedselling_questions', guidedQuestionsSchema, 'dd_guidedselling_questions');
var guidedSection = mongoose.model('dd_guidedselling_sections', guidedSectionSchema, 'dd_guidedselling_sections');
var lookup = mongoose.model('dd_lookups', lookupsSchema, 'dd_lookups');
var opportunity = mongoose.model('dd_opportunities', opportunitySchema, 'dd_opportunities');
var people = mongoose.model('dd_peoples', peopleSchema, 'dd_peoples');
var peopleUser = mongoose.model('dd_peopleusers', peopleUserSchema, 'dd_peopleusers');
var quote = mongoose.model('dd_quotes', quotesSchema, 'dd_quotes');
var roles = mongoose.model('dd_roles_setups', rolesSchema, 'dd_roles_setups');
var security = mongoose.model('dd_securityroles', securitySchema, 'dd_securityroles');
var survey = mongoose.model('dd_surveys', surveySchema, 'dd_surveys');
//  var surveyActions = mongoose.model('dd_survey_actions', surveyActionsSchema, 'dd_survey_actions');
var surveyFormula = mongoose.model('dd_survey_formulas', surveyFormulaSchema, 'dd_survey_formulas');
var surveyQuestions = mongoose.model('dd_survey_questions', surveyQuestionsSchema, 'dd_survey_questions');
//  var surveyRules = mongoose.model('dd_survey_rules', surveyRulesSchema, 'dd_survey_rules');
var surveySections = mongoose.model('dd_survey_sections', surveySectionsSchema, 'dd_survey_sections');
var template = mongoose.model('dd_templates', templateSchema, 'dd_templates');
var unApprovedUsers = mongoose.model('dd_unapproved_users', unApprovedUsersSchema, 'dd_unapproved_users');
// var calc = mongoose.model('dd_user', userSchema, 'dd_user');
module.exports = (db) => {
  return {
    'company': db ? db.model('dd_companies', companySchema, 'dd_companies') : company,
    'accounts': db ? db.model('dd_accounts', accountsSchema, 'dd_accounts') : accounts,
    'actions': db ? db.model('dd_survey_actions', adminSettingsSchema, 'dd_survey_actions') : actions,
    'addInfo': db ? db.model('dd_addinfos', addInfoSchema, 'dd_addinfos') : addInfo,
    "config": db ? db.model("dd_configs", config_schema, "dd_configs") : config,
    "companyOrg": db ? db.model("dd_companyorgs", CompanyOrgSchema, "dd_companyorgs") : companyOrg,
    "content": db ? db.model("dd_contents", config_content_schema, "dd_contents") : content,
    "doctype": db ? db.model("dd_doctypes", config_doctype_schema, "dd_doctypes") : doctype,
    'admin': db ? db.model('dd_admins', adminSchema, 'dd_admins') : admin,
    'calc': db ? db.model('dd_calc_engines', calcSchema, 'dd_calc_engines') : calc,
    'guidedQuestions': db ? db.model('dd_guidedselling_questions', guidedQuestionsSchema, 'dd_guidedselling_questions') : guidedQuestions,
    'guidedSection': db ? db.model('dd_guidedselling_sections', guidedSectionSchema, 'dd_guidedselling_sections') : guidedSection,
    'lookup': db ? db.model('dd_lookups', lookupsSchema, 'dd_lookups') : lookup,
    'opportunity': db ? db.model('dd_opportunities', opportunitySchema, 'dd_opportunities') : opportunity,
    'people': db ? db.model('dd_peoples', peopleSchema, 'dd_peoples') : people,
    'peopleUser': db ? db.model('dd_peopleusers', peopleUserSchema, 'dd_peopleusers') : peopleUser,
    'quote': db ? db.model('dd_quotes', quotesSchema, 'dd_quotes') : quote,
    'roles': db ? db.model('dd_roles_setups', rolesSchema, 'dd_roles_setups') : roles,
    'security': db ? db.model('dd_securityroles', securitySchema, 'dd_securityroles') : security,
    'survey': db ? db.model('dd_surveys', surveySchema, 'dd_surveys') : survey,
    //  'surveyActions':  db?db.model('dd_survey_actions',  surveyActionsSchema, 'dd_survey_actions'):surveyActions,
    'surveyFormula': db ? db.model('dd_survey_formulas', surveyFormulaSchema, 'dd_survey_formulas') : surveyFormula,
    'surveyQuestions': db ? db.model('dd_survey_questions', surveyQuestionsSchema, 'dd_survey_questions') : surveyQuestions,
    //  'surveyRules':  db?db.model('dd_survey_rules',  surveyRulesSchema, 'dd_survey_rules'):surveyRules,
    'surveySections': db ? db.model('dd_survey_sections', surveySectionsSchema, 'dd_survey_sections') : surveySections,
    'template': db ? db.model('dd_templates', templateSchema, 'dd_templates') : template,
    'unApprovedUsers': db ? db.model('dd_unapproved_users', unApprovedUsersSchema, 'dd_unapproved_users') : unApprovedUsers
  }
}
