const express = require("express");

const requireAuth = require("../middleware/requireAuth");
const {
  addRules,
  getRules,
  deleteRule,
  getAllRules,
  deleteRuleGuided,
  updateAllRules,
} = require("../controllers/routesController");

const router = express.Router();

router.use(requireAuth);


router.post("/addRules", addRules);
router.post("/updateAllRules", updateAllRules);
router.post("/getRules", getRules);
router.get("/getAllRule/:guidedId", getAllRules);
router.delete("/deleteRule", deleteRule);
router.delete("/deleteGuidedRule", deleteRuleGuided);

module.exports = router;
