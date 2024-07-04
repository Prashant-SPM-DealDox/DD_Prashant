// var atatus = require("atatus-nodejs");
var cors = require("cors");
const express = require("express");
var fs = require("fs");
// var log4js = require("log4js");
// var morgan = require("morgan");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const mongoose = require("mongoose");
const fetch = require("node-fetch");
// import { Logger } from "mongodriver";
// const cors = require('cors');

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const accountRoutes = require("./routes/accounts");
const opportunityRoutes = require("./routes/opportunity");
const companyRoutes = require("./routes/company");
const configRoutes = require("./routes/config");
const doctypRoutes = require("./routes/doctype");
const templateRoutes = require("./routes/template");
// const peopleRoutes = require('./routes/admin');
const contentRoutes = require("./routes/content");
const quotesRoutes = require("./routes/quotes");
const guidedSellingRoutes = require("./routes/guidedSelling");

const securityRoutes = require("./routes/security");
const roleRoutes = require("./routes/roles");
const lookupsRoutes = require("./routes/lookups");
const surveyRoutes = require("./routes/survey");
const spreadsheetRoutes = require("./routes/spreadsheet");
// const supportRequest = require('./routes/help');
const accessRoutes = require("./routes/access");
const peopleDataRoutes = require("./routes/people");
const quoteGridRoutes = require("./routes/quoteGrid");
const companyOrgRoutes = require("./routes/companyOrg");
const spreadsheetGSRoutes = require("./routes/spreadsheetGS");
const setPasswordRoutes = require("./routes/setPassword");
const surveyRulesRoutes = require("./routes/rules");
const apiContainerRoutes = require("./routes/apiConatiner");

// for new doctype
const app = express();
app.use(cors());
app.use(cors(["*"]));

// ------------------loggers---------------------
// var theAppLog = log4js.getLogger();
// create a write stream (in append mode)
// const logStream = fs.createWriteStream(
//   path.join(
//     __dirname + "/logs",
//     "access" +
//       (new Date().getFullYear() +
//         "" +
//         (new Date().getMonth() + 1) +
//         "" +
//         new Date().getDate()) +
//       ".log"
//   ),
//   {
//     flags: "a",
//   }
// );

// Create a custom stream for Morgan to use
// const consoleStream = {
//   write: function (message) {
//     // Write the message to the log stream
//     logStream.write(message + "\n");
//   },
// };

// console.log = function (message) {
//   // Write the message to the log stream
//   logStream.write("[CONSOLE] " + message + "\n");
// };

// Custom token function to convert UTC to IST
// morgan.token("ist", function (req, res) {
//   // Convert UTC time to IST (add 5 hours and 30 minutes)
//   const utcDate = new Date();
//   // const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
//   const istDate = new Date(utcDate.getTime());

//   return istDate.toString();
// });

// setup the logger
// app.use(
//   morgan(
//     ':remote-addr - :remote-user [:ist] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
//     { stream: consoleStream }
//   )
// );

// Serve static files from the 'public' directory---------------------
app.use(express.static(path.join(__dirname, "public")));
app.get("/api/doctype/download", async (req, res) => {
  const fileUrl = req.query.url; // Assuming the URL is sent as a query parameter

  if (!fileUrl) {
    return res.status(400).send("URL is required");
  }

  try {
    // Fetch the file from the external URL
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Stream the file back to the client
    // Set the correct content type if you know it, or use response.headers.get('content-type')
    res.setHeader("Content-Type", response.headers.get("content-type"));
    response.body.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Increase payload limit for JSON and form data
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // This stores the file in memory, you can configure it to save to disk if needed.
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
}); // 5MB limit
// Define a route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  // Access the uploaded file through req.file
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  res.json({
    originalname: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    size: file.size,
  });
});

// middleware
app.use(express.json());

app.use((req, res, next) => {
  // console.log(req.path, req.method);
  next();
});
// routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/opportunity", opportunityRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/config", configRoutes);
app.use("/api/doctype", doctypRoutes);
app.use("/api/template", templateRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/guidedselling", guidedSellingRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/lookups", lookupsRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/spread", spreadsheetRoutes);
// app.use('/api/help', supportRequest);
app.use("/api/access", accessRoutes);
app.use("/api/people", peopleDataRoutes);
app.use("/api/quoteGrid", quoteGridRoutes);
app.use("/api/companyOrg", companyOrgRoutes);
app.use("/api/spreadgs", spreadsheetGSRoutes);
app.use("/api/setuppass", setPasswordRoutes);
app.use("/api/rules", surveyRulesRoutes);
app.use("/api/apiContainer", apiContainerRoutes);

app.use("/Images", express.static(path.join(__dirname, "Images")));

mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
