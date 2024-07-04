const db = require("../models");
const Supports = db.support;

let count = 1;
const helpRequest = async (req, res) => {

    const user_id = req.user.user_id;
    let customer_token = `SPMINC000000000${count}`;
    const {first_name, last_name, customer_email, contact_number, summary, department, issue, description, priority, contact_type1, contact_type2,  permission_access, date, prefered_time} = req.body;

    try{
        const requestData = await Supports.create({user_id, customer_token, first_name, last_name, customer_email, contact_number, summary, department, issue, description, priority, contact_type1, contact_type2,  permission_access, date, prefered_time});
        if(requestData){
            res.status(200).json({success:"Success"})
        }else{
            res.status(200).json({error: "Failed"})
        }
      } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ error: "Failed to save data" });
    }
      count++;
};

module.exports = { helpRequest }