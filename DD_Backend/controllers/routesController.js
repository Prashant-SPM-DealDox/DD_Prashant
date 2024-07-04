const RulesModel = require("../models/rulesModel");
const GuidedRules = require("../models/rulesModel.guided");




const addRules = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!req.user) {
      res.json(401).json({
        message: "Not Authenticated",
      });
    }

    const user_id = req.user._id;
    if (_id) {
      const allRules = await RulesModel.findById({ _id });
      if (allRules) {
        await RulesModel.findByIdAndUpdate(_id, req.body);
        res.status(200).json({
          data: req.body,
          message: "Rules updated successfully",
        });
      }
    } else {
      const newRule = await RulesModel.create({ user_id, ...req.body });
      res.status(200).json({
        data: newRule,
        message: "Rules created successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const updateAllRules = async (req, res) => {
  try {
    const allRules = req.body;
    if (!req.user) {
      res.json(401).json({
        message: "Not Authenticated",
      });
    }
    console.log(JSON.stringify(req.body.actions));
    if (Array.isArray(allRules) && allRules.length > 0) {
      const rulesPromises = allRules.map(async (x) => {
        await GuidedRules.findByIdAndUpdate(x._id, x);
      });
      await Promise.all(rulesPromises).then((data) => {
        res.status(200).json({
          status: "Success",
          message: "All rules updated",
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};
const getAllRules = async (req, res) => {
  try {
    const { guidedId } = req.params;
    if (!req.user) {
      res.json(401).json({
        message: "Not Authenticated",
      });
    }

    const allRules = await GuidedRules.find({ guidedId });
    res.status(200).json({
      data: allRules ? allRules : [],
      message: allRules.length > 0 ? "Fetched" : "No Data",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};

const deleteRule = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not Authenticated",
      });
    }

    const deletedRuleId = req.body.id;
    const deletedRule = await RulesModel.findByIdAndDelete(deletedRuleId);
    if (!deletedRule) {
      return res.status(404).json({
        message: "Rule not found",
        status: "FAILED",
      });
    }


    const sectionId = deletedRule.sectionId;

  
    const rulesToUpdate = await RulesModel.find({
      sectionId: sectionId,
      ruleIndex: { $gt: deletedRule.ruleIndex }
    });
    for (const rule of rulesToUpdate) {
      rule.ruleIndex = (parseFloat(rule.ruleIndex) - 0.1).toFixed(1);
      await rule.save();
    }


    const updatedRules = await RulesModel.updateMany(
      { sectionId: sectionId, ruleIndex: { $gt: deletedRule.ruleIndex } },
      { sectionId: deletedRule.sectionId }
    );
    if (!updatedRules) {
      return res.status(500).json({
        message: "Failed to update sectionId for rules",
        status: "FAILED",
      });
    }

    return res.status(200).json({
      message: "Rule deleted successfully",
      status: "SUCCESS",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "FAILED",
    });
  }
};
const deleteRuleGuided = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Not Authenticated",
      });
    }

    const deletedRuleId = req.body.id;
    const deletedRule = await GuidedRules.findByIdAndDelete(deletedRuleId);
    if (!deletedRule) {
      return res.status(404).json({
        message: "Rule not found",
        status: "FAILED",
      });
    }

    // Get the section ID of the deleted rule
    const sectionId = deletedRule.sectionId;

    // Update rule indices for rules in the same section
    const rulesToUpdate = await GuidedRules.find({
      sectionId: sectionId,
      ruleIndex: { $gt: deletedRule.ruleIndex }
    });
    for (const rule of rulesToUpdate) {
      rule.ruleIndex = (parseFloat(rule.ruleIndex) - 0.1).toFixed(1);
      await rule.save();
    }

    return res.status(200).json({
      message: "Rule deleted successfully",
      status: "SUCCESS",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "FAILED",
    });
  }
};


const getRules = async (req, res) => {
  try {
    const { surveyId, sectionId } = req.body;
    if (!req.user) {
      res.json(401).json({
        message: "Not Authenticated",
      });
    }

    const allRules = await RulesModel.find({ surveyId, sectionId });
    res.status(200).json({
      data: allRules ? allRules : [],
      message: allRules.length > 0 ? "Fetched" : "No Data",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};


module.exports = {
  addRules,
  getRules,
  deleteRule,
  getAllRules,
  deleteRuleGuided,
  updateAllRules,
};
