const expressAsyncHandler = require("express-async-handler");
// const Doctype = require("../models/doctypeModel");
const fs = require("fs");
const path = require("path");

const mongo = require('../adaptor/mongodb.js');

const reqHeadersDB = (req) => {
  return req.headers['x-key-db'] ? req.headers['x-key-db'] : null;
}

const getDoctypes = async (req, res) => {

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
    // const doctype = await Doctype.find({
    const doctype = await mongo.GetDocument("doctype", {
      admin_id: admin_id,
    }, {}, {}, reqHeadersDB(req));
    if (doctype) {
      res.status(200).json({ status: "success", data: doctype });
    } else {
      res.status(204).json({ status: "Failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addDoctype = expressAsyncHandler(async (req, res, next) => {

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

  const { doc_name } = req.body;
  try {
    //const existingDocType = await Doctype.findOne({ admin_id, doc_name });
    const existingDocType = await mongo.GetOneDocument("doctype", { admin_id, doc_name }, {}, {}, reqHeadersDB(req));

    if (existingDocType) {
      return res.status(400).json({
        error: "DuplicateDoctype",
        message: "Doctype with the same name already exists",
      });
    }

    const doctypeData = await req.body;
    // const files = req.files || {};

    // doctypeData.template_file = files.template_file ? files.template_file[0].filename : null
    // doctypeData.watermark_file = files.watermark_file ? files.watermark_file[0].filename : null
    // const doctype = await Doctype.create({ admin_id, ...doctypeData });
    const doctype = await mongo.InsertDocument("doctype", { admin_id, ...doctypeData }, reqHeadersDB(req));


    if (doctype) {
      res.status(200).json({
        status: "success",
        message: "doctype added successfully",
        data: doctype,
      });
    } else {
      res.status(400).json({ status: "Failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteDoctypeById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  //const transaction = await db.sequelize.transaction();
  try {
    // const doctype = await Doctype.findById(id);
    const doctype = await mongo.findByIdDocument("doctype", id, {}, reqHeadersDB(req));
    if (doctype) {
      // await Doctype.findByIdAndDelete(id);
      await mongo.findByIdAndDeleteDocument("doctype", id, reqHeadersDB(req));
      deletePublicFile(doctype);
      res
        .status(200)
        .json({ status: "success", message: "data deleted successfully" });
    } else {
      res.status(202).json({ status: "Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const deletOneSectionById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const transaction = await db.sequelize.transaction();
  try {
    await Section.destroy({ where: { section_id: id }, transaction });
    await transaction.commit();
    res
      .status(200)
      .json({ status: "success", message: "data deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: message });
  }
});

const updateDoctypeById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const doctype = req.body;


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
    // const doctypeData = await Doctype.findOne({ _id: id });
    const doctypeData = await mongo.GetOneDocument("doctype", { _id: id }, {}, {}, reqHeadersDB(req));

    if (doctypeData) {
      // const files = req.files || {};

      // doctypeData.template_file = files.template_file ? files.template_file[0].filename : doctypeData.template_file;
      // doctypeData.watermark_file = files.watermark_file ? files.watermark_file[0].filename : doctypeData.watermark_file;

      doctypeData.someProperty = doctype.someProperty;

      doctypeData.set(doctype);
      await doctypeData.save();

      res.status(200).json({
        status: "success",
        message: "data updated successfully",
        data: doctypeData,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deletePublicFile = (doctype) => {
  const template_file = doctype.template_file;
  const watermark_file = doctype.watermark_file;
  const filePaths = [
    `../Backend/public/files/${template_file}`,
    `../Backend/public/files/${watermark_file}`,
  ];
  filePaths.forEach((filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  });
  return doctype;
};

module.exports = {
  getDoctypes,
  addDoctype,
  deleteDoctypeById,
  deletOneSectionById,
  updateDoctypeById,
};
