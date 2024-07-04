
const mongo = require("../adaptor/mongodb.js");
const { isValidObjectId } = require('mongoose');
const NewInfo = require('../models/newInfoModel.js');

const reqHeadersDB = (req) => {
  return req.headers["x-key-db"] ? req.headers["x-key-db"] : null;
};
let connection = "";
// add a account

const filterDynamicFields = (infoFound, dynamicFields) => {
  return infoFound.reduce((filteredFields, field) => {
    const { fieldName, fieldType } = field;

    if (dynamicFields.hasOwnProperty(fieldName)) {
      switch (fieldType) {
        case "DATE":
          filteredFields[fieldName] = new Date(dynamicFields[fieldName]);
          break;
        case "BOOLEAN":
          if (typeof dynamicFields[fieldName] === 'boolean') {
            filteredFields[fieldName] = dynamicFields[fieldName];
          }
          break;
        case "TEXT":
          if (typeof dynamicFields[fieldName] === 'string') {
            filteredFields[fieldName] = dynamicFields[fieldName];
          }
          break;
        default:
          break;
      }
    }

    return filteredFields;
  }, {});
};

const getNewInfoModel = async (customFields, dynamicFields) => {
  try {
    let existingNewInfo = await NewInfo.findOne();
    if (customFields) {
      if (existingNewInfo) {
        existingNewInfo.newInfoData = JSON.stringify(customFields);
        existingNewInfo = await existingNewInfo.save();
      } else {
        const newInfoInstance = new NewInfo({
          newInfoData: JSON.stringify(customFields)
        });
        existingNewInfo = await newInfoInstance.save();
      }
    }
    if (dynamicFields  && Object.keys(dynamicFields).length > 0) {
      const infoFound = JSON.parse(existingNewInfo?.newInfoData);
      const filteredFields = filterDynamicFields(infoFound, dynamicFields);
      return filteredFields;
    }
  } catch (err) {
    console.log("Error in updating AddInfo ", err);
  }
}

const getAllAddInfo = async (req, res) => {
  try {
    const data = await NewInfo.findOne();
    if (!data) {
      return res.status(202).json({ message: 'No newInfoData found' });
    }
    res.status(200).json({ customFields: JSON.parse(data.newInfoData) });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const addAccount = async (req, res) => {
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
    accountData,
    billingAddress,
    shippingAddress,
    customFields,
    dynamicFields,
  } = req.body;
  const trimAccountName = accountData.accounts.trim();

  try {
    // Check if an account with the same name already exists
    const updatedDynamicFields = await getNewInfoModel(customFields, dynamicFields);
    let existingAccount = null;
    existingAccount = await mongo.GetDocument(
      "accounts",
      {
        admin_id,
        accounts: { $regex: new RegExp(`^${trimAccountName}$`, "i") },
      },
      {},
      {},
      reqHeadersDB(req)
    );
    if (existingAccount.length > 0) {
      const data = {
        accounts_data: existingAccount[0]
      }
      return res.status(202).json({
        Error: "DuplicateAccount",
        message: "Account with the same name already exists",
        data: data
      });
    }

    // const accounts_data = await Accounts.mongoose.create({
    const accounts_data = await mongo.InsertDocument(
      "accounts",
      {
        admin_id,
        ...accountData,
        ...billingAddress,
        ...shippingAddress,
        dynamicFields: updatedDynamicFields,
      },
      reqHeadersDB(req)
    );

    // const allAccounts = await mongo.GetDocument("accounts");
    // for (const account of allAccounts) {
    //   account.addInput = addInput;
    //   account.dropdownValue = dropdownValue;
    //   account.addInputValue = addInputValue;
    //   await account.save();
    // }

    if (accounts_data) {
      res.status(200).json({ success: "Success", message: 'Account Created', data: { accounts_data } });
    } else {
      res.status(200).json({ error: "Failed" });
    }
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Failed" });
  }
};

const getAccount = async (req, res) => {
  let admin_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
  }

  try {
    // const accounts_data = await Accounts.find({
    //   admin_id: admin_id,
    // });
    let accounts_data = {};
    // let DB_NAME = req.headers['x-key-db'];
    // if(DB_NAME){
    //   var db = connection.getDatabaseConnection(DB_NAME);
    //   var accountsModel = db.model('dd_accounts', Accounts.AccountsSchema);
    //   accounts_data = await  accountsModel.findOne({  admin_id: admin_id, });
    //   console.log("accounts_data",accounts_data);
    // } else {
    // accounts_data = await Accounts.mongoose.find({ admin_id: admin_id });
    accounts_data = await mongo.GetDocument(
      "accounts",
      { admin_id: admin_id },
      {},
      {},
      reqHeadersDB(req)
    );
    // }

    if (!accounts_data) {
      res
        .status(200)
        .json({ status: "Failed", message: "Account Data Not Found" });
    } else {
      res.status(200).json({ data: accounts_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

const updateAccount = async (req, res) => {
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

  const accountIdOrExternalId = req.params.id;

  const {
    accountData,
    billingAddress,
    shippingAddress,
    customFields,
    dynamicFields,
  } = req.body;

  try {

    const updatedDynamicFields = await getNewInfoModel(customFields, dynamicFields);
    const queryCriteria = { admin_id };
    if (isValidObjectId(accountIdOrExternalId)) {
      queryCriteria._id = accountIdOrExternalId;
    } else {
      queryCriteria.external_references_id1 = accountIdOrExternalId;
    }

    const existingAccount = await mongo.GetOneDocument(
      "accounts",
      {
        admin_id,
        accounts: { $regex: new RegExp(`^${accountData.accounts.trim()}$`, "i") },
      },
      {},
      {},
      reqHeadersDB(req)
    );

    if (existingAccount && !(existingAccount?._id.toString() == accountIdOrExternalId || existingAccount?.external_references_id1?.toString() == accountIdOrExternalId) ) {
      return res.status(200).json({
        status : "Error",
        message: "Duplicate account name",
      });
    }

    const updateAccount = await mongo.UpdateDocument(
      "accounts",
      queryCriteria,
      {
        $set: {
          ...accountData,
          ...billingAddress,
          ...shippingAddress,
          dynamicFields : updatedDynamicFields
        },
      },
      reqHeadersDB(req)
    );

    if (updateAccount) {
      res.status(200).json({ status: "Success", message: "Account Updated", });
    } else {
      res.status(200).json({ status: "Error", message: "Failed to update Account Data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error occured while Updating Account" });
  }
};

const deleteAccount = async (req, res) => {
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

  const accountId = req.params.accountId;

  try {
    // const deleteAccount = await Accounts.mongoose.deleteOne({
    const deleteAccount = await mongo.DeleteDocument(
      "accounts",
      {
        admin_id: admin_id,
        _id: accountId,
      },
      reqHeadersDB(req)
    );

    if (deleteAccount) {
      // const oppDelete = await Opportunities.deleteOne({
      const oppDelete = await mongo.DeleteDocument(
        "opportunity",
        {
          // const oppDelete = await mongo.DeleteDocument("opportunity",{
          admin_id: admin_id,
          account_Id: accountId,
        },
        reqHeadersDB(req)
      );
      if (oppDelete) {
        // const deleteQuote = await Quotes.deleteOne({
        const deleteQuote = await mongo.DeleteDocument(
          "quote",
          {
            user_id: admin_id,
            account_Id: accountId,
          },
          reqHeadersDB(req)
        );
      }
      res.status(200).json({ status: "Success", message: "Account Deleted" });
    } else {
      res.status(500).json({ status: "Error", message: "Account Not Found" });
    }
  } catch (error) {
    console.error("Error deleting Account:", error);
    res.status(500).json({ error: "Failed to Delete Account" });
  }
};

module.exports = (conn) => {
  connection = conn;
  return { addAccount, getAccount, updateAccount, deleteAccount, getAllAddInfo };
};
