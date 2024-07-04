const admin = require('../models/adminModel');
const peopleUsers = require('../models/peopleUserModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// const createToken = (_id) => {
//     return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
// }

//ADD People after SetPassword
const addPeopleUser = async (req, res) => {
    const admin_id = req.user._id;

    const { people_email, securityRole, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const peopleUserData = await peopleUsers.create({ admin_id, people_email, securityRole, password: hash, });

        // create a token
        //  const token = createToken(peopleDatas._id)

        if (peopleUserData) {
            res.status(201).json({ status: "Success", message: "Successfully Registered!" })
        } else {
            res.status(400).json({ status: "Failed", message: "Failed to Registered!" });
        }
    } catch (error) {
        res.status(400).json({ status: "Failed", message: error.message });
    }
};

module.exports = { addPeopleUser }