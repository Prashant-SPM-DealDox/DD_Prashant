const salesForce = require("../models/salesForceModel");


//add SF Data
const addSfData = async (req, res) => {

    const { auth_method, backgroundSync, client_id, secret_client_id, bg_sync_default_usr, use_bg_usr_only, login_url, domain_url, lightning_exp, opp_icon_link } = req.body;

    try {

        const clientExist = await salesForce.findOne({ client_id });

        if(clientExist){
            return res
        .status(400)
        .json({
          Error: "Duplicate Client",
          message: "Client already exists",
        });
        }

        const sfData = await salesForce.create({
            auth_method, backgroundSync, client_id, secret_client_id, bg_sync_default_usr, use_bg_usr_only, login_url, domain_url, lightning_exp, opp_icon_link
        });

        if (sfData) {
            res.status(200).json({ success: "Success" });
        } else {
            res.status(200).json({ error: "Failed" });
        }

    } catch (error) {
        res.status(500).json({ error: "Failed" });
    }
}

const getSfData = async (req, res) => {

  
    try {
      
      const salesForce_data = await salesForce.find();
  
      if (!salesForce_data) {
        res.status(200).json({ status: "Failed", message: "SalesForce User Data Not Found" });
      } else {
        res.status(200).json({ data: salesForce_data });
      }
    } catch (error) {
      res.status(200).json({ error: "Failed" });
    }
  };


  const updateSalesForceData = async (req, res) => {
  
  
    const _id = req.params._id;
    const {
        auth_method, backgroundSync, client_id, secret_client_id, bg_sync_default_usr, use_bg_usr_only, login_url, domain_url, lightning_exp, opp_icon_link
    } = req.body;
  
    try {
      const updateSalesForceData = await salesForce.updateOne(
        {
          _id: _id,
        },
        {
          $set: {
            auth_method, backgroundSync, client_id, secret_client_id, bg_sync_default_usr, use_bg_usr_only, login_url, domain_url, lightning_exp, opp_icon_link
          },
        }
      );
  
      if (updateSalesForceData) {
        res.status(200).json({ status: "Success", message: "SalesForceUser Updated" });
      } else {
        res.status(500).json({ status: "Error", message: "SalesForce" });
      }
    } catch (error) {
      console.error("Error updating SalesForceUser:", error);
      res.status(500).json({ error: "Failed to Update SalesForceUser" });
    }
  };


  module.exports = { addSfData, getSfData, updateSalesForceData }