
const CompanyModel = require('../models/companyModel_new')
// Serve static files from the "Images" directory
const Company = (conn) => {
  const getCompany_new = async (req, res) => {
    let DB_NAME = req.headers['x-key-db'];
    var db = conn.getDatabaseConnection(DB_NAME);
    var companies = db.model('dd_companies', CompanyModel,'dd_companies');
  
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

  let query = { company: DB_NAME}
  try {
    // const comp_data = await companies.find(query);
    const comp_data = await companies.aggregate([{ $match: query }]);

    if (!comp_data) {
      res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
    } else {
      res.status(200).json({ data: comp_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
}
return {getCompany_new };

};


module.exports =  {
  Company
};