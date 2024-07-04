// const admin = require('../models/adminModel');
// const People = require('../models/peopleModel');
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const mongo = require("../adaptor/mongodb");

const reqHeadersDB = (req) => {
  return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};

const getSinglePeopleData = async (req, res) => {
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

  const peopleName = req.body.first_name;
  try {
    // const sPeopleData = await People.find({
    const sPeopleData = await mongo.GetDocument(
      "people",
      {
        admin_id: admin_id,
        first_name: { $regex: new RegExp(peopleName, "i") },
      },
      {},
      {},
      reqHeadersDB(req)
    );
    if (sPeopleData.length === 0) {
      res.status(200).json({ status: "Data Not Found" });
    } else {
      res.status(200).json({ data: sPeopleData });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
};

const updateAccess = async (req, res) => {
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
    access,
    email,
    securityRole,
    api_intgr_access,
    sso_user,
    pass_exp_date,
    time_zone,
    language,
    Notification,
    status,
  } = req.body;

  try {
    // const peopleAccess = await People.updateOne(
    const peopleAccess = await mongo.UpdateDocument(
      "people",
      {
        admin_id: admin_id,
        email: email,
      },
      {
        $set: {
          access: access,
          securityRole: securityRole,
          pass_exp_date: pass_exp_date,
          time_zone: time_zone,
          language: language,
          Notification: Notification,
          status: status,
        },
      },
      reqHeadersDB(req)
    );

    if (peopleAccess) {
      // nModified > 0 indicates that the document was updated
      await sendmail(email, admin_id);
      res.status(200).json({ status: "Success", message: "People Updated" });
    } else {
      res.status(500).json({ status: "Error", message: "Unable to Update" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAccess = async (req, res) => {
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

  const { email, access, status } = req.body;

  try {
    // const removeAccess = await People.updateOne(
    const removeAccess = await mongo.UpdateDocument(
      "people",
      {
        admin_id: admin_id,
        email: email,
      },
      {
        $set: { access: access, password: "null", status: status },
      },
      reqHeadersDB(req)
    );
    if (removeAccess) {
      res.status(200).json({ status: "Success", message: "Access Removed" });
    } else {
      res
        .status(500)
        .json({ status: "Error", message: "Unable to Remove Access" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// SET PASSWORD EMAIL
const sendmail = async (email, admin_id) => {
  API_KEY =
    "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";
  sgMail.setApiKey(API_KEY);

  const encodeEmail = encodeURIComponent(email);
  const adminid = encodeURIComponent(admin_id);

  const message = {
    to: email,
    dynamic_template_data: {
      email,
      admin_id,
      encodeEmail,
      adminid,
    },
    from: {
      email: process.env.EMAIL,
    },
    subject: "SET PASSWORD MAIL",
    templateId: "d-ba9ee1f697ed47eeb8ccfbbdd284bc4c", //DEVQA TEMPLATE ID
    // templateId: "d-f0279f1b45a54d94bdc8e8281a41c6a5", //UAT TEMPLATE ID
  };
  sgMail
    .send(message)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { getSinglePeopleData, updateAccess, deleteAccess };
