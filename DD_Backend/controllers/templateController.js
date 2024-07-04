// const Template = require("../models/templateModel");
// const Template = require("../models/templateModel");
// const Admin = require("../models/adminModel");

const mongo = require("../adaptor/mongodb.js");

const reqHeadersDB = (req) => {
  return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};

// add Template
const addTemplate = async (req, res) => {
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
  const { quote_name, description, doc_tempData, catalog_category,
    status, created_by } = req.body;
  const createdAt = new Date();
  const modifiedAt = "";
  const quote_name1 = quote_name.trim();
  try {
    // const existingTemplate = await Template.findOne({
    const existingTemplate = await mongo.GetOneDocument(
      "template",
      {
        admin_id,
        quote_name:{ $regex: new RegExp(`^${quote_name1}$`, "i") },
        description,
      },
      {},
      {},
      reqHeadersDB(req)
    );

    if (existingTemplate) {
      return res.status(400).json({
        error: "duplicateTemplate",
        message: "Template with the same name already exists",
      });
    }
    // const temp_data = await Template.create({
    const temp_data = await mongo.InsertDocument(
      "template",
      {
        admin_id,
        quote_name,
        description,
        catalog_category,
        status,
        doc_tempData,
        created_by,
        createdAt: createdAt,
        modifiedAt: modifiedAt,
      },
      reqHeadersDB(req)
    );
    if (temp_data) {
      res.status(200).json({ success: "Success", data: { temp_data } });
    } else {
      res.status(200).json({ error: "failed222" });
    }
  } catch (error) {
    res.status(200).json({ error: "failed111" });
  }
};

// get template
const getTemplate = async (req, res) => {
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
    // const temp_data = await Template.find({
    const temp_data = await mongo.GetDocument(
      "template",
      {
        admin_id: admin_id,
      },
      {},
      {},
      reqHeadersDB(req)
    );
    if (!temp_data) {
      res
        .status(200)
        .json({ status: "Failed", message: "Template Data Not Found" });
    } else {
      res.status(200).json({ data: temp_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

// update template
const updateTemplate = async (req, res) => {
  // const user_id = req.user._id;
  const templateId = req.params.templateId;

  const { quote_name, doc_tempData, description, catalog_category,
    status, modified_by, revision } =
    req.body;

  try {
    const updatedData = {
      quote_name: quote_name,
      description: description,
      doc_tempData: doc_tempData,
      catalog_category:catalog_category,
      status:status,
      modifiedAt: new Date(),
      modified_by: modified_by,
      revision: revision,
    };
    // const updateTemplate = await Template.updateOne(
    const updateTemplate = await mongo.UpdateDocument(
      "template",
      {
        _id: templateId,
      },
      {
        $set: updatedData,
      },
      reqHeadersDB(req)
    );

    if (updateTemplate) {
      res.status(200).json({ status: "Success", message: "Template Updated" });
    } else {
      res.status(500).json({ status: "Error", message: "Template" });
    }
  } catch (error) {
    console.error("Error updating Template:", error);
    res.status(500).json({ error: "Failed to Update Template" });
  }
};

const deleteTemplate = async (req, res) => {
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

  const templateId = req.params.templateId;

  try {
    // const deleteTemplate = await Template.deleteOne({
    const deleteTemplate = await mongo.DeleteDocument(
      "template",
      {
        admin_id: admin_id,
        _id: templateId,
      },
      reqHeadersDB(req)
    );

    if (deleteTemplate) {
      res.status(200).json({ status: "Success", message: "Template Deleted" });
    } else {
      res.status(500).json({ status: "Error", message: "Template Not Found" });
    }
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ error: "Failed to Delete Template" });
  }
};

//Controller for GuidedSelling Page
const getTemplateforGs = async (req, res) => {
  // Splitting the string of extractedActions into an array
  const quoteNames = req.body.extractedActions;

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
    // Querying with an array of quote_names
    const temp_data = await mongo.GetDocument(
      "template",
      {
        admin_id: admin_id,
        quote_name: { $in: quoteNames },
      },
      {},
      {},
      reqHeadersDB(req)
    );

    if (temp_data.length === 0) {
      res.status(201).json({ status: "Failed", message: "Data Not Found" });
    } else {
      res.status(200).json({ data: temp_data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed" });
  }
};

module.exports = {
  addTemplate,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateforGs,
};
