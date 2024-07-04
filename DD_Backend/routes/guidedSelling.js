const express = require("express");

//Authhentication
const requireAuth = require("../middleware/requireAuth");



const {

  getGuidedRules,
  addGuidedRules,
  deleteGuidedSellingSection,
  deleteGuidedSellingQuestion,
  getGuidedDetailsById,
  addGuidedSection,
  addGuidedQuestion,
  saveGuidedAnswers,
} = require("../controllers/guidedSellingController");

const { calculation } = require("../controllers/bid_estimation");

const router = express.Router();

//require auth for all routes
router.use(requireAuth);

//guidedSelling routes
router.post("/addGuidedSellingQuestions", addGuidedQuestion);
router.post("/addGuidedSellingSections", addGuidedSection);
router.post("/getGuidedSectionsQuestions", getGuidedDetailsById);
router.post("/calculation", calculation);

router.delete("/deleteGuidedSellingSection", deleteGuidedSellingSection);
router.delete("/deleteGuidedSellingQuestion/:id", deleteGuidedSellingQuestion);
router.post("/updateAnswers", saveGuidedAnswers);
router.post("/getGuidedRules", getGuidedRules);
router.post("/addGuidedRules", addGuidedRules);

module.exports = router;