// const CompanyOrg = require("../models/companyOrgModel");
const mongo = require("../adaptor/mongodb");

const reqHeadersDB = (req) => {
  return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};

const addCompanyOrg = async (req, res) => {
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
  const { newCompOrgData } = req.body;
  console.log(req.body, "ppppp");
  try {
    const existingorg = await mongo.GetOneDocument(
      "companyOrg",
      { admin_id, org_name: newCompOrgData.org_name },
      {},
      {},
      reqHeadersDB(req)
    );

    if (existingorg) {
      return res.status(400).json({
        Error: "DuplicateOrg",
        message: "Org with the same name already exists",
      });
    }
    //const companyorg_data = await CompanyOrg.create({
    const companyorg_data = await mongo.InsertDocument(
      "companyOrg",
      {
        admin_id,
        ...newCompOrgData,
      },
      reqHeadersDB(req)
    );

    if (companyorg_data) {
      res.status(200).json({ success: "Success", data: { companyorg_data } });
    } else {
      res.status(200).json({ error: "Failed111111111" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed2222222222" });
  }
};
const getCompanyOrg = async (req, res) => {
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
  try {
    const companyorg_data = await mongo.GetDocument(
      "companyOrg",
      {
        admin_id: admin_id,
      },
      {},
      {},
      reqHeadersDB(req)
    );

    if (!companyorg_data) {
      res
        .status(200)
        .json({ status: "Failed", message: "CompanyOrg Data Not Found" });
    } else {
      res.status(200).json({ data: companyorg_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

const updateCompanyOrg = async (req, res) => {
  const companyOrgId = req.params.companyOrgId;
  const data = req.body;
  try {
    const updateCompanyOrg = await mongo.UpdateDocument(
      "companyOrg",
      { _id: companyOrgId },
      { $set: data },
      reqHeadersDB(req)
    );
    if (updateCompanyOrg) {
      res.status(200).json({ status: "success", message: "People Updated" });
    } else {
      res
        .status(404)
        .json({ status: "error", message: "People Not Found or Not Updated" });
    }
  } catch (error) {
    console.error("Error updating companyOrg:", error);
    res.status(500).json({ error: "Failed to update companyOrg content" });
  }
};

const deleteCompanyOrg = async (req, res) => {
  // const user_id = req.user._id;
  const companyOrgId = req.params.companyOrgId;

  try {
    const deleteCompanyOrg = await mongo.DeleteDocument(
      "companyOrg",
      {
        _id: companyOrgId,
      },
      reqHeadersDB(req)
    );

    if (deleteCompanyOrg) {
      res
        .status(200)
        .json({ status: "Success", message: "companyOrg Deleted" });
    } else {
      res
        .status(500)
        .json({ status: "Error", message: "companyOrg Not Found" });
    }
  } catch (error) {
    console.error("Error deleting companyOrg:", error);
    res.status(500).json({ error: "Failed to companyOrg content" });
  }
};
module.exports = {
  addCompanyOrg,
  getCompanyOrg,
  updateCompanyOrg,
  deleteCompanyOrg,
};
