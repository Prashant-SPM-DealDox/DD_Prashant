// const Company = require('../models/companyModel')
// Serve static files from the "Images" directory
const mongo = require("../adaptor/mongodb");

const reqHeadersDB = (req) => {
  return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};
// add company profile

const addCompany = async (req, res) => {
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

  const { newCompData } = req.body;

  try {
    // const comp_data = await Company.create({admin_id, companyLogo,companyName,searchValue,userAuthorizationDomain,companyDomain,contactPersonFirstName,contactPersonLastName,phone,email,street,city,state,country});
    const comp_data = await mongo.InsertDocument(
      "company",
      {
        admin_id,
        ...newCompData,
      },
      reqHeadersDB(req)
    );
    if (comp_data) {
      res.status(200).json({ success: "Success" });
    } else {
      res.status(200).json({ error: "failed" });
    }
  } catch (error) {
    res.status(200).json({ error: "failed" });
  }
};

const getCompany = async (req, res) => {
  if (req.params.admin_id) {
    try {
      // const comp_data = await Company.find({
      const comp_data = await mongo.GetDocument(
        "company",
        {
          admin_id: req?.params?.admin_id,
        },
        {},
        {},
        reqHeadersDB(req)
      );

      if (!comp_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "Account Data Not Found" });
      } else {
        res.status(200).json({ data: comp_data });
      }
    } catch (error) {
      res.status(200).json({ error: "Failed" });
    }
  } else {
    res.status(500).json({ status: "Failed", message: "admin_id Not Found" });
  }
};
const getCompanyAll = async (req, res) => {
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
    // const comp_data = await Company.find({
    const comp_data = await mongo.GetDocument(
      "company",
      {
        company: admin_id,
      },
      {},
      {},
      reqHeadersDB(req)
    );

    if (!comp_data) {
      res
        .status(200)
        .json({ status: "Failed", message: "Account Data Not Found" });
    } else {
      res.status(200).json({ data: comp_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

// update company
const updateCompany = async (req, res) => {
  // const user_id = req.user._id;
  const companyId = req.params.companyId;

  const {
    companyLogo,
    companyName,
    searchValue,
    userAuthorizationDomain,
    companyDomain,
    contactPersonFirstName,
    contactPersonLastName,
    phone,
    email,
    street,
    city,
    state,
    country,
  } = req.body;

  try {
    // const updateCompany = await Company.updateOne(
    const updateCompany = await mongo.UpdateDocument(
      "company",
      {
        // user_id: user_id,
        _id: companyId,
      },
      {
        $set: {
          companyLogo,
          companyName,
          searchValue,
          userAuthorizationDomain,
          companyDomain,
          contactPersonFirstName,
          contactPersonLastName,
          phone,
          email,
          street,
          city,
          state,
          country,
        },
      },
      reqHeadersDB(req)
    );

    if (updateCompany) {
      res.status(200).json({ status: "Success", message: "Company Updated" });
    } else {
      res.status(500).json({ status: "Error", message: "Comapny" });
    }
  } catch (error) {
    console.error("Error updating Company:", error);
    res.status(500).json({ error: "Failed to Update Company" });
  }
};
module.exports = { addCompany, getCompany, updateCompany, getCompanyAll };
