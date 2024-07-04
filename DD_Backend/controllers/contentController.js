// const User = require('../models/userModel');
// const Content = require("../models/contentModel");

const mongo = require("../adaptor/mongodb.js");

const reqHeadersDB = (req) => {
  return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};

// add a content
const addContent = async (req, res) => {
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

  const { createdcontentData } = req.body;

  const trimContentName = createdcontentData.content_name.trim();
  try {
    // Check if an account with the same name already exists
    //  const existingContent = await Content.findOne({ admin_id, content_name });
    const existingContent = await mongo.GetOneDocument(
      "content",
      { admin_id, 
        content_name:{ $regex: new RegExp(`^${trimContentName}$`, "i") } },
      {},
      {},
      reqHeadersDB(req)
    );

    if (existingContent) {
      return res.status(400).json({
        Error: "DuplicateContent",
        message: "content with the same name already exists",
      });
    }
    // const Contents_data = await Content.create({
    const Contents_data = await mongo.InsertDocument(
      "content",
      {
        admin_id,
        ...createdcontentData,
      },
      reqHeadersDB(req)
    );

    if (Contents_data) {
      res.status(200).json({ success: "Success", data: { Contents_data } });
    } else {
      res.status(200).json({ error: "Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed" });
  }
};

const getContent = async (req, res) => {
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
    // const contents_data = await Content.find({
    const contents_data = await mongo.GetDocument(
      "content",
      {
        admin_id: admin_id,
      },
      {},
      {},
      reqHeadersDB(req)
    );

    if (!contents_data) {
      res
        .status(200)
        .json({ status: "Failed", message: "Content Data Not Found" });
    } else {
      res.status(200).json({ data: contents_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

const updateContent = async (req, res) => {
  // const user_id = req.user._id;
  const contentId = req.params.contentId;
  const {
    updatecontentData
  } = req.body;

  try {
    // const updateContent = await Content.updateOne(
    const updateContent = await mongo.UpdateDocument(
      "content",
      { _id: contentId },
      {
        $set: {
          ...updatecontentData
        },
      },
      reqHeadersDB(req)
    );
    

    if (updateContent) {
      res.status(200).json({ status: "Success", message: "content Updated" });
    } else {
      res.status(500).json({ status: "Error", message: "content Not Found" });
    }
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ error: "Failed to Update content" });
  }
};

const deleteContent = async (req, res) => {
  // const user_id = req.user._id;
  const contentId = req.params.contentId;

  try {
    // const deleteContent = await Content.deleteOne({
    const deleteContent = await mongo.DeleteDocument(
      "content",
      {
        _id: contentId,
        // user_id: user_id,
      },
      reqHeadersDB(req)
    );

    if (deleteContent) {
      res.status(200).json({ status: "Success", message: "content Deleted" });
    } else {
      res.status(500).json({ status: "Error", message: "content Not Found" });
    }
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ error: "Failed to Delete content" });
  }
};

module.exports = { addContent, getContent, updateContent, deleteContent };
