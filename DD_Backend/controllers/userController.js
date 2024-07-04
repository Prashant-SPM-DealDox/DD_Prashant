const db = require("../models");
const User = db.user
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const sgMail = require('@sendgrid/mail');

API_KEY = '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';

sgMail.setApiKey(API_KEY);

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      res.status(200).json({ status: "Failed", message: "All Fields must be filled!" });

    }
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      res.status(200).json({ status: "Failed", message: "Incorrect email" });
    }
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log(match + "--------------------------------------------");
      if (!match) {
        res.status(200).json({ status: "Failed", message: "Incorrect Password" });

      } else {
        // create a token
        const token = createToken(user.user_id);
        res.status(200).json({ status: "Success", message: "Successfully Loggedin!", email, token, user });
      }
    }

  } catch (error) {
    console.log(error)
    res.status(200).json({ status: "Failed", message: "Please try after sometime! " });

  }
}

// signup a user
const signupUser = async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);
  console.log(req.body)
  const { firstname, lastname, password, company, job_title, email, no_of_employees, phone_number, country  } = req.body;

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({ firstname, lastname,  password: hash, company, job_title, email, no_of_employees, phone_number, country });

    // create a token
    const token = createToken(user._id)
    if (user) {
      res.status(201).json({ status: "Success", message: "Successfully Registered!" });
      await sendmail(userEmail);
    } else {
      res.status(400).json({ status: "Failed", message: "Failed to Registered!" });
    }
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }
}

//API to Scan Authenticator APP
const generatedSecrets = {}; // Store generated secrets for users
const generateQrcode = async (req, res) => {
  const userId = req.query.userId; // You need to pass the user's unique identifier here
  if (!generatedSecrets[userId]) {
    generatedSecrets[userId] = speakeasy.generateSecret({
      name: 'DEALDOX',
    });
  }

  const secret = generatedSecrets[userId];
  qrcode.toDataURL(secret.otpauth_url, function (error, data) {
    res.json({ data, secret });
  });
};

//API to verify the OTP
const validate = async (req, res) => {
  const userId = req.query.userId;
  const { otp, secret } = req.body;
  var verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'ascii',
    token: otp
  });

  if (verified) {
    res.json({ message: 'OTP validated successfully and secret updated' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
};

const sendmail = async (email) => {
  const message = {
    to: email,
    from: process.env.EMAIL,
    subject: 'Registration Confirm Page',
    text: 'Welcome To DealDox',
    html: `<h1>Welcome to DealDox</h1>
    <p>Your DealDox account is ready. Use the link below to log in.</p>
    <button style = "background-color: #216c98; width: 500px; height: 50px;"><a href="http://43.204.175.183:8000/" style = "text-decoration: none;">Login</a></button> <br> to Verify Your Account!.`
};

sgMail.send(message)
.then(() => {
  console.log('Email sent');
})
.catch((error) => {
  console.log(error);
});
};

module.exports = { signupUser, loginUser, generateQrcode, validate }