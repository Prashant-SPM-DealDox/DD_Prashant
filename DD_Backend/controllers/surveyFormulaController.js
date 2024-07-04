// const Formula = require('../models/surveyFormulaModel');

// // add formula 
// const addFormula = async (req, res) => {
//   let admin_id, people_id;

//   if (req.user.admin_id) {
//     admin_id = req.user.admin_id;
//     people_id = req.user._id;
//   } else {
//     admin_id = req.user._id;
//     people_id = null;
//   }

//   const {
//     survey_key,
//     survey_section_key,
//     survey_question_key,
//     formula_add_filed,
//     formula_add_operator,
//     formula_add_function,
//     formula_evaluate,
//     formula_add_formula,
//   } = req.body;

//   try {
//     // Assuming user_id, survey_key, survey_section_key, and survey_question_key are available in req.body
//     const formula_data = await Formula.create({
//       user_id: admin_id,
//       survey_key,
//       survey_section_key,
//       survey_question_key,
//       admin_id, // Adding admin_id to the formula_data
//       people_id, // Adding people_id to the formula_data
//       formula_add_filed,
//       formula_add_operator,
//       formula_add_function,
//       formula_evaluate,
//       formula_add_formula,
//     });

//     if (formula_data) {
//       res.status(200).json({ success: "Success" });
//     } else {
//       res.status(200).json({ error: "Failed" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // get function
// const getFormula= async (req, res) => {
  
//     let admin_id, people_id;
  
//     if (req.user.admin_id) {
//       // If req.user.admin_id is not empty
//       admin_id = req.user.admin_id;
//       people_id = req.user._id;
//     } else {
//       // If req.user.admin_id is empty
//       admin_id = req.user._id;
//       people_id = null;
//     }
  
//     try {

//     const {survey_key, survey_section_key, survey_question_key} = req.body;
//       const formula_data = await Formula.find({
//         admin_id: admin_id, 
//         survey_key: survey_key,
//         survey_section_key:survey_section_key,
//         survey_question_key:survey_question_key

        
//       });
  
//       if (!formula_data) {
//         res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
//       } else {
//         res.status(200).json({ data: formula_data });
//       }
//     } catch (error) {
//       res.status(200).json({ error: "Failed" });
//     }
//   };

//   // update formula
// const updateFormula = async (req, res) => {
//     const user_id = req.user._id;
//     const formulaId = req.params.formulaId;
//     console.log("user id",user_id);
//     console.log("formulaId",formulaId);
  
//     const {formula_add_filed,formula_add_operator,formula_add_function,formula_evaluate,formula_add_formula} = req.body;
  
//     try {
//       const updateFormula = await Formula.updateOne(
//         {
//           user_id: user_id,
//           _id: formulaId,
//       },
//       {
//         $set:
//         {formula_add_filed,formula_add_operator,formula_add_function,formula_evaluate,formula_add_formula},
//       }
//       );
  
//       if(updateFormula){
//         res.status(200).json({status: "Success", message: "Account Updated"});
//       }else {
//         res.status(500).json({ status: "Error", message: "Account" });
//       }
//     }catch (error) {
//       console.error("Error updating Account:", error);
//       res.status(500).json({ error: "Failed to Update Account" });
//     }
//   };

// module.exports = { addFormula,getFormula,updateFormula };
