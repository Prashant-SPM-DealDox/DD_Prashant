module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  PUBLIC_DOMAIN:["yahoo"],
  ALLOW_EMPLOYEES: ['251-500 employees',"501-1000 employees", "1001-2000+ employees" ],
  DEFAULT_COLLECTIONS: ["dd_accounts", "dd_admins", "dd_calc_engines", "dd_companies", "dd_configs","dd_companyorgs", "dd_contents", "dd_doctypes", "dd_guidedselling_questions", "dd_guidedselling_sections", "dd_lookups", "dd_opportunities", "dd_peoples", "dd_peopleusers", "dd_quotes", "dd_roles_setups", "dd_securityroles", "dd_survey_actions", "dd_survey_formulas", "dd_survey_questions", "dd_survey_rules", "dd_survey_sections", "dd_surveys", "dd_templates", "dd_unapproved_users"],
};
