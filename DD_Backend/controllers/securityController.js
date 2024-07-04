// const admin = require('../models/adminModel');
// const Security = require('../models/securityModel');
const mongo = require('../adaptor/mongodb.js');

const reqHeadersDB = (req) => {
    return req.headers['x-key-db'] ? req.headers['x-key-db'] : null;
}

const addSecurity = async (req, res) => {
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

    const data = req.body.sendData;
    try {
        // const security = await Security.create({ admin_id, ...data })
        const security = await mongo.InsertDocument("security", { admin_id, ...data }, reqHeadersDB(req))
        if (security) {
            res.status(200).json({ status: "success", message: "security added successfully" });
        } else {
            res.status(400).json({ status: "Failed" });
        }
    } catch (error) {
        console.error(error);  // Log the error message for debugging
        res.status(500).json({ error: error.message });
    }
}


const getSecurity = async (req, res) => {

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
        // const security = await Security.find( { admin_id: admin_id });
        const security = await mongo.GetDocument("security", { admin_id: admin_id }, {}, {}, reqHeadersDB(req));
        if (security) {
            res.status(200).json({ status: "success", data: security });
        } else {
            res.status(204).json({ status: "No data found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getSpecificRole = async (req, res) => {
    
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
    const { role } = req.body;
    console.log("sharath", req.body);
    try {
        // const security = await Security.find( {  role_name: role });
        const security = await mongo.GetDocument("security", { role_name: role, admin_id: admin_id  }, {}, {}, reqHeadersDB(req));
        if (security) {
            res.status(200).json({ status: "success", data: security });
        } else {
            res.status(204).json({ status: "No data found" });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};


const updateSecurityById = async (req, res) => {

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
        const id = req.params.id;
        console.log("!@#$%$");
        console.log(id);
        // const security = await Security.findOne({  _id: id  });
        const security = await mongo.GetOneDocument("security", { _id: id }, {}, {}, reqHeadersDB(req));
        console.log(security)
        if (security) {
            // Update the security model fields with the data from req.body
            security.set(req.body.sendData);
            await security.save();
            res.status(202).json({ status: "success", message: "data updated successfully" });
        } else {
            res.status(404).json({ status: "Not Found" }); // Change 402 to 404 for not found
        }
    } catch (error) {
        console.log(error); // Log the error for troubleshooting
        res.status(500).json({ error: error.message });
    }
};


const deleteSecurityById = async (req, res) => {

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
        const securityRoleid = req.params.id;
        console.log(securityRoleid);
        // const security = await Security.findByIdAndDelete({ _id: securityRoleid  })
        const security = await mongo.findByIdAndDeleteDocument("security", { _id: securityRoleid }, reqHeadersDB(req))
        if (security) {
            await security.delete();
            res.status(200).json({ status: "success", message: "data deleted successfully" });
        } else {
            res.status(202).json({ status: "Not Found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getSecurity, addSecurity, getSpecificRole, updateSecurityById, deleteSecurityById }