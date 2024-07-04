const mongo = require('../adaptor/mongodb.js');
const { isValidObjectId } = require('mongoose');

const reqHeadersDB = (req) => {
  return req.headers['x-key-db'] ? req.headers['x-key-db'] : null;
}

// add a account
const addOpportunity = async (req, res) => {
  let admin_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
    people_id = null;
  }

  const {
    newOpportunityData
  } = req.body;
  
  const oppCurrencies = newOpportunityData.oppCurrency;
  const trimmedOppName = newOpportunityData.opportunity_name.trim();
  try {

    // const existingOpportunity = await Opportunities.findOne({
    const existingOpportunity = await mongo.GetOneDocument("opportunity", {
      admin_id: admin_id,
      account_Id: newOpportunityData.account_Id,
      opportunity_name: { $regex: new RegExp(`^${trimmedOppName}$`, 'i') },

    }, {}, {}, reqHeadersDB(req));
    if (existingOpportunity) {
      // return res
      //   .status(400)
      //   .json({ message: "Opportunity with the same name already exists" });
      return res.status(202).json({
        Error: "DuplicateOpportunity",
        message: "Opportunity with the same name already exists",
        data: existingOpportunity
      });
    }

    // const opportunity_data = await Opportunities.create({
    const opportunity_data = await mongo.InsertDocument("opportunity", {
      admin_id,
      ...newOpportunityData,
      currency: oppCurrencies
    }, reqHeadersDB(req));

    if (opportunity_data) {
      res.status(200).json({ success: "Success", data: opportunity_data });
    } else {
      res.status(200).json({ error: "Failed1111" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed2222222" });
  }
};

const getOpportunity = async (req, res) => {
  let admin_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
  }

  const account_id = req.body.account_Id;
  try {
    // const opportunity_data = await Opportunities.find({
    const opportunity_data = await mongo.GetDocument("opportunity", {
      admin_id: admin_id,
      account_Id: account_id,
    }, {}, {}, reqHeadersDB(req));


    if (!opportunity_data) {
      res
        .status(200)
        .json({ status: "Failed", message: "Opportunity Data Not Found" });
    } else {
      res.status(200).json({ data: opportunity_data });
    }
  } catch (error) {
    res.status(401).json({ error: "Failed" });
  }
};

const updateOpportunity = async (req, res) => {
  //const opportunity_id = req.params.id;
  let admin_id, people_id;
  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
    people_id = null;
  }

  const oppIdOrExternalId = req.params.id;
  const {
    opportunityData,
    billingAddress,
    shippingAddress,
  } = req.body;

  const trimmedOppName = opportunityData?.opportunity_name.trim();
  const oppCurrencies = opportunityData?.oppCurrency;
  const account_Id = opportunityData?.account_Id;
  try {

    const queryCriteria = { account_Id };
    if (isValidObjectId(oppIdOrExternalId)) {
      queryCriteria._id = oppIdOrExternalId;
    } else {
      queryCriteria.external_references_id1 = oppIdOrExternalId;
    }
   
    const existingOpportunity = await mongo.GetOneDocument("opportunity", {
      admin_id: admin_id,
      opportunity_name: { $regex: new RegExp(`^${trimmedOppName}$`, 'i') },
    }, {}, {}, reqHeadersDB(req));

    if (existingOpportunity && !(existingOpportunity?._id.toString() == oppIdOrExternalId || existingOpportunity?.external_references_id1?.toString() == oppIdOrExternalId)) {
      return res
        .status(200)
        .json({ message: "Opportunity name already exists" });
    }

   
    const updatedOpportunity = await mongo.findOneAndUpdateDocument("opportunity",
      queryCriteria,
      {
        $set: {
          ...opportunityData,
          ...billingAddress,
          ...shippingAddress,
          currency: oppCurrencies
        },
      },
      { new: true }, reqHeadersDB(req)
    );

    if (updatedOpportunity) {
      res
        .status(200)
        .json({ status: "Success", message: "Opportunity Updated" });
    } else {
      res
        .status(200)
        .json({ status: "Error", message: "Failed to update opportunity" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error Occured while Updating Opportunity" });
  }
};

const deleteOpportunity = async (req, res) => {
  // const user_id = req.user._id;
  const opportunity_id = req.params.id;

  try {
    // const deleteOpportunity = await Opportunities.deleteOne({
    const deleteOpportunity = await mongo.DeleteDocument("opportunity", {
      _id: opportunity_id,
      // user_id: user_id,
    }, reqHeadersDB(req));

    if (deleteOpportunity) {
      res
        .status(200)
        .json({ status: "Success", message: "Opportunity Deleted" });
    } else {
      res
        .status(500)
        .json({ status: "Error", message: "Opportunity Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Delete Opportunity" });
  }
};
const getSpecificOpportunity = async (req, res) => {
  const admin_id = req.user._id;
  const opp_id = req.body.opp_id;
  try {
    // const opportunity_data = await Opportunities.find({
    const opportunity_data = await mongo.GetDocument("opportunity", {
      admin_id: admin_id,
      _id: opp_id,
    }, {}, {}, reqHeadersDB(req));

    if (!opportunity_data) {
      res
        .status(200)
        .json({ status: "Failed", message: "Opportunity Data Not Found" });
    } else {
      res.status(200).json({ data: opportunity_data });
    }
  } catch (error) {
    res.status(401).json({ error: "Failed" });
  }
};

module.exports = {
  addOpportunity,
  getOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getSpecificOpportunity,
};
