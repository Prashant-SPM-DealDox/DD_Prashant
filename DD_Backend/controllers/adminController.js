// const Admin = require("../models/adminModel");
// const UnApprovedUsers = require("../models/UnApprovedUsersModel");
// const Comapny = require("../models/companyModel.js");
// const People = require("../models/peopleModel");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
const config = require("../config/db.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const DB = require("../adaptor/createDB.js");
const sgMail = require("@sendgrid/mail");
const mongo = require("../adaptor/mongodb.js");

const reqHeadersDB = (req) => {
  return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// signup a user
const signupUser = async (req, res) => {
  const adminEmail = req.body.email;
  const {
    firstname,
    lastname,
    password,
    company,
    job_title,
    email,
    no_of_emp,
    phone_num,
    country,
  } = req.body;

  let emailText = null;
  let emailTextDot = email.split("@")[1];
  if (emailTextDot) {
    emailText = emailTextDot.split(".")[0];
  }
  // console.log("split-->>", companyText, emailText);
  // const userCompany = await UnApprovedUsers.findOne({ $text: { $search: companyText +" "+emailText  } });
  // const useremail = await UnApprovedUsers.findOne({ email: email });
  // const useremail = await UnApprovedUsers.aggregate([{ $project: { email: { $split: ["$email", "@"] }, qty: 1 } },
  //  { $unwind: "$email" }, { $match: { email: emailTextDot } }]);
  const useremail = await mongo.GetAggregation(
    "unApprovedUsers",
    [
      { $project: { email: { $split: ["$email", "@"] }, qty: 1 } },
      { $unwind: "$email" },
      { $match: { email: emailTextDot } },
    ],
    null
  );
  // if(config.PUBLIC_DOMAIN.some(check => (check == emailText?.toLowerCase()))){
  if (
    Array.isArray(config.PUBLIC_DOMAIN) &&
    config.PUBLIC_DOMAIN.some((check) => check == emailTextDot?.toLowerCase())
  ) {
    //  if(emailText?.toLowerCase() == "gmail" ||  emailText?.toLowerCase() == "yahoo"){
    res.status(400).json({
      status: "Failed",
      message: "Please registered with bussiness email ID",
    });
  } else if (useremail == null || useremail.length == 0) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      // create a token
      const verifyToken = await createToken(company);
      let data = {
        firstname,
        lastname,
        password: hash,
        company,
        job_title,
        email,
        no_of_emp,
        phone_num,
        country,
        verifyToken,
      };
      if (
        Array.isArray(config.ALLOW_EMPLOYEES) &&
        config.ALLOW_EMPLOYEES.some(
          (check) => check == no_of_emp?.toLowerCase()
        )
      ) {
        data.dbName = emailTextDot.replace(".", "_");
      } else {
        data.dbName = null;
      }
      const adminData = await mongo.InsertDocument(
        "unApprovedUsers",
        data,
        null
      );

      // send email to Approver
      await sendApprovalmail(email, verifyToken, company, phone_num);
      // send email to Customer
      await sendCustomerMail(email, firstname);

      if (adminData) {
        res
          .status(201)
          .json({ status: "Success", message: "Successfully Registered!" });
      } else {
        res
          .status(400)
          .json({ status: "Failed", message: "Failed to Register!" });
      }
    } catch (error) {
      console.log("error-->", error);
      res.status(400).json({ status: "Failed", message: error.message });
    }
  } else if (useremail.length >= 0 || useremail[0].email == "gmail.com") {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      // create a token
      const verifyToken = await createToken(company);
      let data = {
        firstname,
        lastname,
        password: hash,
        company,
        job_title,
        email,
        no_of_emp,
        phone_num,
        country,
        verifyToken,
      };
      if (
        Array.isArray(config.ALLOW_EMPLOYEES) &&
        config.ALLOW_EMPLOYEES.some(
          (check) => check == no_of_emp?.toLowerCase()
        )
      ) {
        data.dbName = emailTextDot.replace(".", "_");
      } else {
        data.dbName = null;
      }
      const adminData = await mongo.InsertDocument(
        "unApprovedUsers",
        data,
        null
      );

      // send email to Approver
      await sendApprovalmail(email, verifyToken, company, phone_num);
      // send email to Customer
      await sendCustomerMail(email, firstname);

      if (adminData) {
        res
          .status(201)
          .json({ status: "Success", message: "Successfully Registered!" });
      } else {
        res
          .status(400)
          .json({ status: "Failed", message: "Failed to Register!" });
      }
    } catch (error) {
      console.log("error-->", error);
      res.status(400).json({ status: "Failed", message: error.message });
    }
  } else {
    res.status(400).json({
      status: "Failed",
      message: "Company/email already registered Please check.",
    });
  }
};

// Verify OTP for Admin
const verifyCompanyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (otp && email) {
      // const admin = await UnApprovedUsers.findOne({ otp: otp, email: email });
      const admin = await mongo.GetOneDocument(
        "unApprovedUsers",
        { otp: otp, email: email },
        {},
        {},
        null
      );
      if (admin) {
        // const updateAccount = await UnApprovedUsers.updateOne(
        const updateAccount = await mongo.UpdateDocument(
          "unApprovedUsers",
          {
            email: email,
          },
          {
            $set: {
              // verifyToken: verifyToken,
              otp: null,
            },
          },
          null
        );

        if (updateAccount?.acknowledged) {
          res.status(200).json({
            status: "Success",
            message: "Account Verification Email Sent!",
          });
        } else {
          res.status(500).json({ status: "Error", message: "Account" });
        }
      } else {
        res.status(500).json({ status: "Error", message: "Account Not Found" });
      }
    } else {
      res.status(500).json({ status: "Error", message: "Invalid OTP" });
    }
  } catch (error) {}
};

//Approve/verify the company
const companyApproval = async (req, res) => {
  const token = req.params.token;

  try {
    if (token) {
      const approveText =
        req.params.token.split(":")[1] == 1 ? "Approved" : "Rejected";
      const approveToken = req.params.token.split(":")[0];
      const admin = await mongo.GetOneDocument(
        "unApprovedUsers",
        { verifyToken: approveToken },
        {},
        {},
        null
      );
      // Send email to customer for successful approval/rejected.
      const mail = await sendCustomerApprovalMail(
        admin.email,
        approveText,
        admin.firstname
      );
      if (admin) {
        if (approveText == "Approved") {
          let otp = generateOTP();
          await sendOTPVerificationEmail(admin.email, admin.firstname, otp);
          // const updateAccount = await UnApprovedUsers.updateOne(
          const updateAccount = await mongo.UpdateDocument(
            "unApprovedUsers",
            {
              verifyToken: approveToken,
            },
            {
              $set: {
                status: approveText,
                otp: otp,
              },
            },
            null
          );

          if (updateAccount?.acknowledged) {
            console.log("updateAccount?.acknowledged-->>", admin, approveText);
            if (approveText == "Approved") {
              const {
                firstname,
                lastname,
                password,
                company,
                job_title,
                email,
                no_of_emp,
                phone_num,
                country,
              } = admin;
              // const adminApprovedUserData = await Admin.create({
              const adminApprovedUserData = await mongo.InsertDocument(
                "admin",
                {
                  firstname,
                  lastname,
                  password: password,
                  company,
                  dbName: admin.dbName ? admin.dbName : null,
                  job_title,
                  email,
                  no_of_emp,
                  phone_num,
                  country,
                  verifyToken: req.params.token.split(":")[0],
                  status: approveText,
                },
                null
              );
              console.log("adminApprovedUserData-->", adminApprovedUserData);
              if (
                Array.isArray(config.ALLOW_EMPLOYEES) &&
                config.ALLOW_EMPLOYEES.some(
                  (check) => check == no_of_emp?.toLowerCase()
                )
              ) {
                const DBCreation = await DB.createDB(admin.dbName);
                setTimeout(async () => {
                  console.log(
                    "company insterted in dynamic db",
                    company,
                    adminApprovedUserData
                  );
                  let data = await mongo.InsertDocument(
                    "company",
                    {
                      admin_id: adminApprovedUserData._id,
                      companyName: company,
                      email,
                      companyDomain: email.split("@")[1],
                      phone: phone_num,
                      country,
                      contactPersonFirstName: firstname,
                      contactPersonLastName: lastname,
                    },
                    admin.dbName
                  );
                  console.log("data-->", data);
                  let docdata = {
                    _id: new ObjectId(adminApprovedUserData._id),
                    firstname: adminApprovedUserData.firstname,
                    lastname: adminApprovedUserData.lastname,
                    password: adminApprovedUserData.password,
                    company: adminApprovedUserData.company,
                    job_title: adminApprovedUserData.job_title,
                    email: adminApprovedUserData.email,
                    no_of_emp: adminApprovedUserData.no_of_emp,
                    phone_num: adminApprovedUserData.phone_num,
                    country: adminApprovedUserData.country,
                    dbName: adminApprovedUserData.dbName,
                    status: approveText,
                  };
                  await mongo.InsertDocument(
                    "admin",
                    docdata,
                    //  {
                    //   firstname,
                    //   lastname,
                    //   password: password,
                    //   dbName: admin.dbName,
                    //   company,
                    //   job_title,
                    //   email,
                    //   no_of_emp,
                    //   phone_num,
                    //   country,
                    //   verifyToken: req.params.token.split(":")[0],
                    //   status: approveText
                    // }
                    admin.dbName
                  );
                }, 10000);
              } else {
                await mongo.InsertDocument(
                  "company",
                  {
                    admin_id: adminApprovedUserData._id,
                    companyName: company,
                    email,
                    companyDomain: email.split("@")[1],
                    phone: phone_num,
                    country,
                    contactPersonFirstName: firstname,
                    contactPersonLastName: lastname,
                  },
                  null
                );
              }
              if (adminApprovedUserData) {
                res.status(200).json({
                  status: "Success",
                  message: "Account Approved and Updated",
                });
              }
            } else {
              res.status(200).json({
                status: "Success",
                message: "Account Rejected and Updated",
              });
            }
          } else {
            res.status(500).json({ status: "Error", message: "Account" });
          }
        }
      } else {
        res.status(500).json({ status: "Error", message: "Account Not Found" });
      }
    } else {
      res.status(500).json({ status: "Error", message: "Invalid Token" });
    }
  } catch (error) {
    console.log(error);
  }
};

//login for user and people
const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    if (!userEmail || !password) {
      res
        .status(200)
        .json({ status: "Failed", message: "All Fields must be filled!" });
      return; // Make sure to return after sending the response to avoid further execution
    }
    const email = userEmail.trim().toLowerCase();
    let emailTextDot = email.split("@")[1];
    // fetch data from unApprovedUsers - masterDB
    const unApprovedUser = await mongo.GetOneDocument(
      "unApprovedUsers",
      { email: { $regex: new RegExp(`^${email}$`, "i") } },
      {},
      {},
      null
    );
    // fetch data from people - masterDB
    const peopleMaster = await mongo.GetOneDocument(
      "people",
      { email: { $regex: new RegExp(`^${email}$`, "i") } },
      {},
      {},
      null
    );
    let peopleData = {};
    if (!unApprovedUser) {
      if (peopleMaster) {
        let peopleMasterData = await mongo.GetAggregation(
          "people",
          [
            {
              $match: {
                email: { $regex: new RegExp(`^${email}$`, "i") },
                access: "granted",
              },
            },
            {
              $lookup: {
                from: "dd_admins",
                localField: "admin_id",
                foreignField: "_id",
                as: "admin_status",
              },
            },
            { $unwind: "$admin_status" },
          ],
          null
        );
        peopleData = peopleMasterData[0];
      } else {
        const peopleUser = await mongo.GetAggregation(
          "people",
          [
            { $match: { email: email, access: "granted" } },
            {
              $lookup: {
                from: "dd_admins",
                localField: "admin_id",
                foreignField: "_id",
                as: "admin_status",
              },
            },
            { $unwind: "$admin_status" },
          ],
          emailTextDot.replace(".", "_")
        );
        peopleData = peopleUser[0];
      }
    }
    if (
      unApprovedUser?.status == "Approved" ||
      peopleData?.admin_status.status == "Approved"
    ) {
      const admin = await mongo.GetOneDocument(
        "admin",
        { email: email },
        {},
        {},
        null
      );
      const token = createToken(admin ? admin._id : peopleData._id);
      if (unApprovedUser?.otp) {
        unApprovedUser._id = admin._id;
        res.status(200).json({
          status: "Failed_otp",
          message: "Please validate your OTP",
          email,
          userType: "admin",
          token,
          admin: unApprovedUser,
        });
      } else {
        if (!admin) {
          if (!peopleData) {
            res
              .status(200)
              .json({ status: "Failed", message: "Incorrect email" });
            return; // Make sure to return after sending the response
          } else {
            const match = await bcrypt.compare(password, peopleData.password);
            if (!match) {
              res
                .status(200)
                .json({ status: "Failed", message: "Incorrect Password" });
            } else {
              // create a token
              res.status(200).json({
                status: "Success",
                message: "Successfully Loggedin!",
                email,
                token,
                userType: "people",
                admin: peopleData?.admin_status,
                people: peopleData,
              });
            }
          }
        }
        if (admin) {
          const match = await bcrypt.compare(password, admin.password);

          if (!match) {
            res
              .status(200)
              .json({ status: "Failed", message: "Incorrect Password" });
          } else {
            // create a token
            res.status(200).json({
              status: "Success",
              message: "Successfully Loggedin!",
              userType: "admin",
              email,
              token,
              admin,
            });
          }
        }
      }
    } else if (unApprovedUser?.status == "Rejected") {
      res
        .status(200)
        .json({ status: "Failed", message: "Account activation is rejected." });
    } else {
      res.status(200).json({
        status: "Failed",
        message: "Account activation is under review",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Failed", message: "Please try after sometime!" });
  }
};

//API to Scan Authenticator APP
const generateQrcode = async (req, res) => {
  const userId = req.user._id;
  let secret;
  // let user = await Admin.findOne({ _id: userId });
  let user = await mongo.GetOneDocument("admin", { _id: userId }, {}, {}, null);

  if (!user) {
    // user = await People.findOne({ _id: userId }); // Find user in the People collection
    user = await mongo.GetOneDocument(
      "people",
      { _id: userId },
      {},
      {},
      reqHeadersDB(req)
    ); // Find user in the People collection
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  }

  if (!user.secret_key) {
    secret = speakeasy.generateSecret({
      name: `DEALDOX Account`,
    });
    user.secret_key = secret.base32;
    await user.save();
  } else {
    secret = { base32: user.secret_key };
  }
  // Generate OTP authentication URL
  const otpauthUrl = speakeasy.otpauthURL({
    label: `DealDox-Account ${req.user.email}`, // Replace 'YourLabel' with the appropriate label for your application
    algorithm: "sha1",
    secret: secret.base32,
  });
  qrcode.toDataURL(otpauthUrl, function (error, data) {
    if (error) {
      return res.status(500).json({ error: "QR code generation failed" });
    }
    res.json({ data, secret });
  });
};

//API to verify the OTP
const validate = async (req, res) => {
  try {
    const { otp, secret } = req.body;

    var verified = speakeasy.totp.verify({
      secret: secret,
      token: otp,
    });

    if (verified) {
      // const adminUpdate = await Admin.findByIdAndUpdate(req.user._id, { first_time_login: true });
      const adminUpdate = await mongo.findByIdAndUpdateDocument(
        "admin",
        req.user._id,
        { first_time_login: true },
        {},
        null
      );
      if (!adminUpdate) {
        // await People.findByIdAndUpdate(req.user._id, { first_time_login: true });
        await mongo.findByIdAndUpdateDocument(
          "people",
          req.user._id,
          { first_time_login: true },
          {},
          reqHeadersDB(req)
        );
      }
      res.status(200).json({ success: true, message: "OTP validated successfully and secret updated" });
    } else {
      res.status(200).json({success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error validating OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//API to Reset Login Status
const userStatusUpdate = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      res
        .status(400)
        .json({ status: "Failed", message: "All fields must be filled!" });
      return;
    }

    const admin = await mongo.GetOneDocument(
      "admin",
      { email: email },
      {},
      {},
      null
    );
    if (admin) {
      await mongo.findOneAndUpdateDocument(
        "admin",
        { email },
        { $set: { first_time_login: false } }
      );
      res
        .status(200)
        .json({ status: "Success", message: "Status has been updated." });
    } else {
      const people = await mongo.GetOneDocument(
        "people",
        { email: email },
        {},
        {},
        null
      );
      if (people) {
        await mongo.findOneAndUpdateDocument(
          "people",
          { email },
          { $set: { first_time_login: false } }
        );
        res
          .status(200)
          .json({ status: "Success", message: "Status has been updated." });
      } else {
        res
          .status(400)
          .json({ status: "Failed", message: "Unable to update Status." });
      }
    }
  } catch (error) {
    console.error("Error in StatusUpdate:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
  }
};

// forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // const forgot = await Admin.findOne({
    const forgot = await mongo.GetOneDocument(
      "admin",
      {
        email: email,
      },
      {},
      {},
      null
    );
    if (forgot) {
      await sendmail(email);
      res.status(200).json({ status: "success", message: "mail Sent", email });
    } else {
      res.status(200).json({ error: "Failed", message: "Check Your Email" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//API to reset Password
const passwordreset = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "Failed", message: "All fields must be filled!" });
      return;
    }

    // const admin = await Admin.findOne({ email: email });
    const admin = await mongo.GetOneDocument(
      "admin",
      { email: email },
      {},
      {},
      null
    );
    if (admin) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Update the password in the database
      // await Admin.findOneAndUpdate({ email: email }, { $set: { password: hash } });
      await mongo.findOneAndUpdateDocument(
        "admin",
        { email: email },
        { $set: { password: hash } },
        {},
        null
      );
      res
        .status(200)
        .json({ status: "Success", message: "Password updated successfully." });
    } else {
      res.status(404).json({ status: "Failed", message: "Admin not found." });
    }
  } catch (error) {
    console.error("Error in passwordreset:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
  }
};

//------------------------------------------------Flutter API's Start--------------------------------------------------------------------

//API for Flutter Mobile Application
const setGeneratedPin = async (req, res) => {
  const { generatedPin, email } = req.body;

  try {
    // Find the admin by email
    const adminPinUpdate = await mongo.findOneAndUpdateDocument(
      "admin",
      { email: email },
      {},
      {},
      null
    );
    if (!adminPinUpdate) {
      // If admin not found, update people document
      const peoplePinUpdate = await mongo.findOneAndUpdateDocument(
        "people",
        { email: email },
        { $set: { generatedPin: generatedPin, mobilefirst_login: true } }
      );
      if (peoplePinUpdate) {
        res
          .status(200)
          .json({ status: "Success", message: "Pin Saved successfully." });
      } else {
        res
          .status(400)
          .json({ status: "Error", message: "Unable to save Pin." });
      }
    } else {
      // Update the generatedPin for admin
      const adminPinUpdateResult = await mongo.findOneAndUpdateDocument(
        "admin",
        { email: email },
        { $set: { generatedPin: generatedPin, mobilefirst_login: true } }
      );
      if (adminPinUpdateResult) {
        res
          .status(200)
          .json({ status: "Success", message: "PIN Updated Successful." });
      } else {
        res
          .status(400)
          .json({ status: "Error", message: "Unable To Update PIN." });
      }
    }
  } catch (error) {
    console.error("Error in PIN Update:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
  }
};

//API to validate the pin to login for flutter
const validatePin = async (req, res) => {
  const { email, generatedPin } = req.body;
  try {
    // Find the admin by email
    const admin = await mongo.GetOneDocument(
      "admin",
      { email: email },
      {},
      {},
      null
    );
    if (!admin) {
      // If admin not found, check in people table
      const people = await mongo.GetOneDocument(
        "people",
        { email: email },
        {},
        {},
        null
      );
      if (people && people.generatedPin === generatedPin) {
        // Update first_time_login if the pin is correct
        res
          .status(200)
          .json({ status: "Success", message: "PIN Verified Successfully." });
      } else {
        res.status(400).json({ status: "Error", message: "Incorrect PIN." });
      }
    } else {
      // If admin found, check the generatedPin
      if (admin.generatedPin === generatedPin) {
        // Update first_time_login if the pin is correct
        res
          .status(200)
          .json({ status: "Success", message: "PIN Verified Successfully." });
      } else {
        res.status(400).json({ status: "Error", message: "Incorrect PIN." });
      }
    }
  } catch (error) {
    console.error("Error validating PIN:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const validatePin = async (req, res) => {
//   const { email, generatedPin } = req.body;
//   console.log("credentials", req.body);
//   try {
//     // Find the admin by email
//     const admin = await mongo.GetOneDocument("admin", { email: email }, {});
//     console.log(admin);
//     if (!admin) {
//       // If admin not found, check in people table
//       const people = await mongo.GetOneDocument("people", { email: email }, {});
//       if (people && people.generatedPin === generatedPin) {
//         res.status(200).json({ status: "Success", message: "PIN Verified Successfully." });
//       } else {
//         res.status(400).json({ status: "Error", message: "Incorrect PIN." });
//       }
//     } else {
//       // If admin found, check the generatedPin
//       if (admin.generatedPin === generatedPin) {
//         res.status(200).json({ status: "Success", message: "PIN Verified Successfully." });
//       } else {
//         res.status(400).json({ status: "Error", message: "Incorrect PIN." });
//       }
//     }
//   } catch (error) {
//     console.error('Error validating PIN:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

//API to ResetPin for Flutter
const userMobileStatusUpdate = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      res
        .status(400)
        .json({ status: "Failed", message: "All fields must be filled!" });
      return;
    }

    const admin = await mongo.GetOneDocument(
      "admin",
      { email: email },
      {},
      {},
      null
    );
    if (admin) {
      await mongo.findOneAndUpdateDocument(
        "admin",
        { email },
        { $set: { mobilefirst_login: false } }
      );
      res
        .status(200)
        .json({ status: "Success", message: "Status has been updated." });
    } else {
      const people = await mongo.GetOneDocument(
        "people",
        { email: email },
        {},
        {},
        null
      );
      if (people) {
        await mongo.findOneAndUpdateDocument(
          "people",
          { email },
          { $set: { mobilefirst_login: false } }
        );
        res
          .status(200)
          .json({ status: "Success", message: "Status has been updated." });
      } else {
        res
          .status(400)
          .json({ status: "Failed", message: "Unable to update Status." });
      }
    }
  } catch (error) {
    console.error("Error in StatusUpdate:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
  }
};

//------------------------------------------------Flutter API's END---------------------------------------------------------------------
// SEND APPROVER MAIL
const sendApprovalmail = async (email, verifyToken, company, phone_num) => {
  API_KEY =
    "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";

  sgMail.setApiKey(API_KEY);
  const message = {
    to: process.env.APPROVER_MAIL,
    // to: ["naveen.a@spmglobaltech.com", "kushal.bl@spmglobaltech.com"],
    from: "info@dealdox.io",
    subject: `Welcome to DealDox Account Setup Confirmation`,
    text: "Welcome to DealDox Account Setup Confirmation",
    html: `<p>Welcome to DealDox!</p>
    <p> Dear Admin.</p>
    <p style="line-height: 1.7;">We are pleased to inform you that new account has been successfully set up in the deyqa
    environment of DealDox! To ensure a seamless onboarding process, we kindly request your approval
    or rejection by using the links provided below:</p>
<a href="${process.env.PROTOCOL}://${process.env.HOST}/api/admin/companyApproval/${verifyToken}:1" style="text-decoration: none"><button style="background-color: #216c98; width: 200px; height: 50px; color: white; cursor: pointer !important;">Approve</button></a>
<a href="${process.env.PROTOCOL}://${process.env.HOST}/api/admin/companyApproval/${verifyToken}:0" style="text-decoration: none;"><button style="background-color: #216c98; width: 200px; height: 50px; color: white; cursor: pointer !important;">Reject</button></a>
<p>Account Details :</p>
<p>Account Name : ${company} Account!.  </p> <p>Email Address: ${email} </p> <p>Phone Number: ${phone_num} </p>`,
  };
  await sgMail
    .send(message)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

// SEND CUSTOMER MAIL
const sendCustomerMail = async (email, firstname) => {
  const API_KEY =
    "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";

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(API_KEY);

  const message = {
    to: email,
    dynamic_template_data: {
      firstname,
    },
    from: {
      email: "info@dealdox.io",
    },
    subject: "Customer Mail",
    templateId: "d-3ba52ed122a94d56ada2b22eb01477ea", //DEVQA ID
    // templateId: "d-2edef7247cae4aedb613ede0c30a94df", //UAT ID
  };

  await sgMail
    .send(message)
    .then(() => {
      console.log("Customer Email sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

// const sendCustomerApprovalMail = async (email, text, company) => {
//   API_KEY =
//     "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";

//     sgMail.setApiKey(API_KEY);
//     const message = {
//       to: email,
//       from: "info@dealdox.io",
//       subject: `Welcome Aboard - DealDox!`,
//       text: "Welcome To DealDox",
//       html: `<p>${company},</p>
//         <p style="line-height: 1.7;">We are delighted to inform you that your account has been successfully activated. With this activation,
//         we aim to enhance your overall experience by providing the following benefits:<br></p>
//         <ul>
//         <li>Generating quotations in less than a minute</li>
//         <li>Bridging the Communication Gap</li>
//         <li>Empowering Sales Professionals</li>
//         <li>Improving Conversion Rates</li>
//         <li>Streamlining Document Generation through Automation</li>
//         <li>Ensuring Mobile Accessibility for convenience on the go</li>
//       </ul>
//       <p style="line-height: 1.7;">We invite you to <a href="https://calendly.com/d/5g4-bn3-jgd/one-off-meeting">schedule a meeting</a> for a quick demo.<br><br>
//       For security reasons, we cannot use your account to access the application. To proceed, please create a user email under the name "dealdoxadmin" using your company
//      domain and share access details with support@dealdox.io This will enable us to effectively showcase DealDox's features and assist with any inquiries you might have.<br><br>
//      If you have any questions or need further assistance, please contact support@dealdox.io<br><br>
//      We look forward to serving you effectively.
//      <p style="line-height: 1.7;">Your Mail ID is ${text}.Kindly <a href="https://www.devqa.dealdox.io/" style = "text-decoration: none;">Login</a></p>
//      </div> `
//     };

//   await sgMail
//     .send(message)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const sendCustomerApprovalMail = async (email, text, company) => {
//   API_KEY =
//     "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";

//   sgMail.setApiKey(API_KEY);
//   const message = {
//     to: email,
//     from: "info@dealdox.io",
//     subject: `${company} , Your Mail ID is ${text}`,
//     text: "Welcome To DealDox",
//     html: `<h1>${company} , Your Mail ID is ${text}. Kindly login </h1>
//     <p><a href="http://localhost:3000" style = "text-decoration: none;">Login</a></p>`
//   };

//   await sgMail
//     .send(message)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const sendCustomerApprovalMail = async (email, approveText, firstname) => {
  API_KEY =
    "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";

  sgMail.setApiKey(API_KEY);
  let message = {};
  if (approveText === "Approved") {
    message = {
      to: process.env.APPROVER_MAIL,
      dynamic_template_data: {
        email,
        approveText,
        firstname,
      },
      from: {
        email: "info@dealdox.io",
      },
      subject: "Welcome Aboard - DealDox !",
      templateId: "d-c65538be216e45148139788a6cbeda1f", //DEVQA TEMPLATE ID
      // templateId: "d-bf785c03f38a403d9d3e91aa2e2ebaca", //UAT TEMPLATE ID
    };
  } else {
    message = {
      to: process.env.APPROVER_MAIL,
      dynamic_template_data: {
        email,
        approveText,
        firstname,
      },
      from: {
        email: "info@dealdox.io",
      },
      subject: "Account Activation Denied",
      templateId: "d-eb6dadfcb6f24c4b90d50cd0f11d5bf6", //DEVQA TEMPLATE ID
      // templateId: "d-7cd863e864404683a3731a6930e60732", //UAT TEMPLATE ID
    };
  }
  message = {
    ...message,
    to: email,
    from: "info@dealdox.io",
  };

  try {
    await sgMail.send(message);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

// const sendOTPVerificationEmail = async (email, otp) => {
//   API_KEY =
//     "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";
//     const message = {
//       to: email,
//       from: "info@dealdox.io",
//       subject: `DealDox OTP`,
//       text: "Welcome To DealDox!",
//       html: `<div>
//       <p>Hi</p>

//       <p style="line-height: 1.7;">Greetings from DealDox! <br>
//       We have generated a One Time Password (OTP) for your recent activity. Your OTP is as follows:<br>
//       One Time Password:${otp}<br>
//       Please be advised that this OTP is valid for the next 10 minutes only. For security reasons, we kindly ask you not to share this OTP with anyone.<br><br>
//       If you have any questions or need more assistance, please contact support@dealdox.io</p>,

//     <div>`

//     };

//   await sgMail
//     .send(message)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const sendOTPVerificationEmail = async (email, firstname, otp) => {
  API_KEY =
    "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";
  const message = {
    to: email,
    dynamic_template_data: {
      firstname,
      otp,
    },
    from: {
      email: "info@dealdox.io",
    },
    subject: "",
    templateId: "d-ae023ea681174056b3d318596b7e5239", //DEVQA TEMPLATE ID
    // templateId: "d-9afe987b372445af95f50b4e4321904d", //UAT TEMPLATE ID
  };
  await sgMail
    .send(message)
    .then(() => {
      console.log("OTP sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

// RESET PASSWORD
const sendmail = async (email) => {
  API_KEY =
    "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";
  sgMail.setApiKey(API_KEY);

  const encodedEmail = encodeURIComponent(email);
  console.log("ENC", encodedEmail);
  const message = {
    to: email,
    dynamic_template_data: {
      encodedEmail,
    },
    from: {
      email: process.env.EMAIL,
    },
    subject: "ResetPassword",
    templateId: "d-f407902951b74b82bee78fd420ebb663", //DEVQA TEMPLATE ID
    // templateId: "d-ab8f6425b7144d4e98915c81152dfd58", //UAT TEMPLATE ID
  };

  sgMail
    .send(message)
    .then(() => {
      console.log(" Reset Password Email sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

const generateUrlTokenForThirdParty = async (req, res) => {
  const { userEmail} = req.body;

  try {
    if (!userEmail) {
      return res.status(400).json({ message: 'UserEmail  required!' });
    }
    let userType;
    let result = await mongo.GetOneDocument("admin", {
      email: userEmail,
    }, {}, {}, null);

    if (result) {
      userType = "admin";
    }

    if (!result) {
      result = await mongo.GetOneDocument("people", {
        email: userEmail.trim().toLowerCase(),
      }, {}, {}, null);

      if (result) {
        userType = "people";
      }
    }

    if (!result) {
      return res.status(201).json({ message: 'User not found!' });
    }

    // if (!result.password || !await bcrypt.compare(password, result.password)) {
    //   return res.status(201).json({ message: 'Wrong Password !', userType: userType });
    // }

    if (userType === "admin" && result.status !== "Approved") {
      return res.status(201).json({ message: 'User not approved!', userType: userType });
    } else if (userType === "people" && result.access !== "granted") {
      return res.status(201).json({ message: 'Access not Granted!', userType: userType });
    }

    const token = createToken(result._id);
    return res.status(200).json({
      status: "Success",
      message: "Redirect URL generated for user",
      email: userEmail,
      userType: userType,
      url: `http://localhost:3000/salesforceUserLogin`,
      token
    });

  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  signupUser,
  loginUser,
  generateQrcode,
  validate,
  companyApproval,
  forgotPassword,
  passwordreset,
  verifyCompanyOTP,
  setGeneratedPin,
  validatePin,
  userStatusUpdate,
  userMobileStatusUpdate,
  generateUrlTokenForThirdParty
};
