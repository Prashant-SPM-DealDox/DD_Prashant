const express = require("express");

//Authhentication
const requireAuth = require("../middleware/requireAuth");

//controller function
const {
  addSurvey,
  getSurvey,
  deleteSurvey,
  addSurveySections,
  deleteSurveySection,
  addSurveyQuestions,
  deleteSurveyQuestions,
  getSurveyGuidedSelling,
  getSurveyQuestionsguidedSelling,
  getSurveyNames,
  getSurveyDetailsById,
} = require("../controllers/surveyController");
const router = express.Router();
//require auth for all routes
router.use(requireAuth);
//=================================================================================================
// Survey routes
router.post("/addSurvey", addSurvey);
router.get("/getSurvey", getSurvey);
router.delete("/deleteSurvey/:id", deleteSurvey);
router.post("/getSurveyNames", getSurveyNames);

//survey section routes
router.post("/addSurveySections", addSurveySections);
router.get("/getSurveyDetailsById/:surveyId", getSurveyDetailsById);

router.delete("/deleteSurveySection", deleteSurveySection);

//survey Question routes
router.post("/addSurveyQuestions", addSurveyQuestions);
router.delete("/deleteSurveyQuestions/:questionId", deleteSurveyQuestions);
router.post(
  "/getSurveyQuestionsguidedSelling",
  getSurveyQuestionsguidedSelling
);

router.post("/getSurveyGuidedSelling", getSurveyGuidedSelling);

module.exports = router;
