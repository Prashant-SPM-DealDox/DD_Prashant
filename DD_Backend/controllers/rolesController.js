// const Roles = require("../models/rolesModel");
// const { mongo } = require("mongoose");
const mongo = require("../adaptor/mongodb.js");
const reqHeadersDB = (req) => {
  return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};
const addRoles = async (req, res) => {
  let admin_id, people_id;
 
  if (req.user.admin_id) {
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    admin_id = req.user._id;
    people_id = null;
  }
 
  const data = req.body;
  const role_name = data.role_name;
  const created_At = new Date();
  try {
    const existingRole = await mongo.GetOneDocument(
      "roles",
      { admin_id, role_name },
      {},
      {},
      reqHeadersDB(req)
    );
 
    if (existingRole) {
      res.status(400).json({ error: "Role already exists" });
    } else {
      const rolesData = await mongo.InsertDocument(
        "roles",
        { admin_id, ...data, createdAt: created_At },
        reqHeadersDB(req)
      );
      if (rolesData) {
        res
          .status(201)
          .json({ success: "Role added successfully", data: { rolesData } });
      } else {
        res.status(400).json({ error: "Failed to add role" });
      }
    }
  } catch (error) {
    console.error("ERROR:", error);
    res.status(400).json({ error: "Failed to add role" });
  }
};
 
// ******************************************************************************************************************************
const getRoles = async (req, res) => {
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
    // const rolesdata = await Roles.find({
    const rolesdata = await mongo.GetDocument(
      "roles",
      {
        admin_id: admin_id,
      },
      {},
      {},
      reqHeadersDB(req)
    );
 
    if (!rolesdata) {
      res
        .status(404)
        .json({ status: "Failed", message: "Roles Data Not Found" });
    } else {
      res.status(200).json({ data: rolesdata });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve roles" });
  }
};
 
const updateRoles = async (req, res) => {
  const rolesId = req.params.id;
  const data = req.body;
  const modified_At = new Date();
  try {
    const updateRoles = await mongo.UpdateDocument(
      "roles",
      { _id: rolesId },
      {
        $set: {
          ...data,
          modifiedAt: modified_At,
        },
      },
      reqHeadersDB(req)
    );
 
    if (updateRoles) {
      res.status(200).json({ status: "Success", message: "Roles Updated" });
    } else {
      res.status(404).json({ status: "Error", message: "Roles Not Found" });
    }
  } catch (error) {
    console.error("Error updating Roles:", error);
    res.status(500).json({ error: "Failed to Update Roles" });
  }
};
 
const deleteRolesById = async (req, res) => {
  try {
    const rolesId = req.params.id;
    const roles = await mongo.findByIdAndDeleteDocument(
      "roles",
      rolesId,
      reqHeadersDB(req)
    );
    if (roles) {
      res
        .status(200)
        .json({ status: "success", message: "People deleted successfully" });
    } else {
      res.status(404).json({ status: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
module.exports = { addRoles, getRoles, updateRoles, deleteRolesById };
 