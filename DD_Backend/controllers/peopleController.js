// const People = require("../models/peopleModel");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");

const mongo = require('../adaptor/mongodb.js');

const reqHeadersDB = (req) => {
  return req.headers['x-key-db'] ? req.headers['x-key-db'] : null;
}

API_KEY =
  "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";

sgMail.setApiKey(API_KEY);

const addPeople = async (req, res) => {
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

  const data = req.body;
  const created_At = new Date();

  try {
    //check if the people exit
    // const duplicatePeople = await People.findOne({ email: data.email });
    const admin = await mongo.GetOneDocument("admin", { _id: admin_id }, {}, {}, null);
    
    const duplicatePeople = await mongo.GetOneDocument("people", { email: data.email }, {}, {}, reqHeadersDB(req));

    //if same people found
    if (duplicatePeople) {
      return res
        .status(201)
        .json({ Error: "error", message: "People Record already exist!" });
    }
    if((admin?.email?.split("@")[1] !== data?.email?.split("@")[1] )){
      return res
        .status(201)
        .json({ Error: "error", message: "People email invalid domain name!" });
    }

    //Assigning the catalogRoles to a variable
    // const catalogRoles = data.catalog_role.map((role) => role.value);

    //Creating a new array which contain catalogRoles and people data
    // const newData = { ...data, catalog_role: catalogRoles , createdAt:created_At };

    // const people = await People.create({ admin_id, ...newData });
    const people = await mongo.InsertDocument("people", { admin_id, ...data }, reqHeadersDB(req));

    if (people) {
      res.status(200).json({
        success: "success",
        name: `${data.first_name}  ${data.last_name}, email:${data.email}`,
        data: { people }
      });
    } else {
      res
        .status(400)
        .json({ Error: "error", message: "Falied To create People" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getPeople = async (req, res) => {
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
    // const people = await People.find({

    const people = await mongo.GetDocument("people", {
      admin_id: admin_id,
    }, {}, {}, reqHeadersDB(req));

    if (people) {
      // Check if there's data in the array
      res.status(200).json({ status: "success", data: people });
    } else {
      res.status(200).json({ status: "No data found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const updatePeopleRecord = async (req, res) => {
//   const peopleId = req.params.peopleId;
//   const data = req.body;
//   console.log("receivedData" , data);
//   try {

//     const currentPeopleRoles = await mongo.GetDocument("people", {
//       _id: peopleId,
//     }, {}, {}, reqHeadersDB(req));

//     console.log("sdhfeudsiufiuesdif" , currentPeopleRoles);

//   const assignedRoles = currentPeopleRoles[0].catalog_role || ""; // Accessing catalog_role from the first element of the array
//   const updatedcatalogRoles = data.catalog_role || "";  
//   console.log(assignedRoles); 
//   console.log(updatedcatalogRoles);   

//     // const updateResult = await People.updateOne(
//     // const updateResult = await mongo.UpdateDocument("people",
//     //   { _id: peopleId },
//     //   { $set: data }
//     //   ,reqHeadersDB(req));

//     // if (updateResult) {
//     //   res.status(200).json({ status: "success", message: "People Updated" });
//     // } else {
//     //   res
//     //     .status(404)
//     //     .json({ status: "error", message: "People Not Found or Not Updated" });
//     // }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };


const updatePeopleRecord = async (req, res) => {
  const peopleId = req.params.peopleId;
  const newData = req.body;
  console.log("receivedData", newData);
  try {
    const currentPeople = await mongo.GetDocument("people", { _id: peopleId }, {}, {}, reqHeadersDB(req));
    if (!currentPeople || currentPeople.length === 0) {
      return res.status(404).json({ status: "error", message: "People not found" });
    }

    const currentData = currentPeople[0];
    
    // Ensure uniqueness of catalog_role
    const currentRoles = currentData.catalog_role || [];
    const updatedRoles = newData.catalog_role || [];
    const uniqueRoles = updatedRoles.filter(role => !currentRoles.includes(role));
    const mergedRoles = [...currentRoles, ...uniqueRoles];

    // Construct the updated data object
    const updatedData = {
      ...currentData.toObject(), // Convert Mongoose document to plain JavaScript object
      ...newData,
      catalog_role: mergedRoles
    };

    // Update the document with the merged data
    const updateResult = await mongo.UpdateDocument("people", { _id: peopleId }, updatedData, reqHeadersDB(req));

    if (updateResult) {
      res.status(200).json({ status: "success", message: "People Updated" });
    } else {
      res.status(404).json({ status: "error", message: "People Not Updated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = { addPeople, getPeople, updatePeopleRecord };
