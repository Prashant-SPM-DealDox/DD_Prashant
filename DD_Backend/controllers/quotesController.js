const Quotes = require("../models/quotesModel");
const md5 = require("md5");
const GuidedSellingQuestions = require("../models/guidedQuestionsModel");
const GuidedSellingSection = require("../models/guidedSectionModel");
const SurveyQuestion = require("../models/surveyQuestionsModel"); // Make sure the model name matches your model name
const SurveySections = require("../models/surveySectionsModel");
const SurveyRules = require("../models/rulesModel");
const GuidedRules = require("../models/rulesModel.guided");
const GuidedCalcModel = require("../models/calcModelGS");
const SurveyCalcEngine = require("../models/calcModel");
const GuidedCalcEngine = require("../models/calcModelGS");
const calcModelGS = require("../models/calcModelGS");

const addQuotes = async (req, res) => {
  // const user_id = req.user._id;
  let user_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    user_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    user_id = req.user._id;
    people_id = null;
  }
  const { acc_key, opp_id, survey_key, survey_name } = req.body;
  try {
    const get_quotes = await Quotes.find({
      user_id: user_id,
      account_id: acc_key,
      opportunity_id: opp_id,
    });
    var count = 1;
    if (get_quotes.length > 0) {
      count = Number(get_quotes[get_quotes.length - 1].quotes_name) + 1;
    }
    if (count < 10) {
      count = "00" + count;
    }
    if (count >= 10 && count < 100) {
      count = "0" + count;
    }
    if (count >= 100 && count < 1000) {
      count = "" + count;
    }
    // if (Quotes.length == 0) {
    const Quotes_data = await Quotes.create({
      user_id: user_id,
      account_id: acc_key,
      opportunity_id: opp_id,
      template_type: survey_key,
      quotes_name: count,
      template_name: survey_name,
    });

    const sectionData = await SurveySections.find({
      user_id: user_id,
      surveyId: survey_key,
    });

    const surveyCalcData = await SurveyCalcEngine.find({
      user_id: user_id,
      survey_key: survey_key,
    });
    if (Quotes_data && surveyCalcData) {
      try {
        if (surveyCalcData) {
          const addParentCalcToChild = await GuidedCalcEngine.create({
            user_id: user_id,
            guidedId: Quotes_data._id,
            surveyId: survey_key,
            data: surveyCalcData[0]?.data,
          });
        }
      } catch (error) {
        console.error("Error creating addParentCalcToChild:", error);
      }
    }

    if (Quotes_data && sectionData && sectionData.length > 0) {
      let surveyRules = await SurveyRules.find({
        surveyId: survey_key,
      }).select("-_id");
      surveyRules = surveyRules.map((rules) => {
        return rules._doc;
      });

      const promises = sectionData.map(
        async ({
          _id: sectionId,
          sectionName,
          sectionPosition,
          isHide,
          ...element
        }) => {
          const newSection = await GuidedSellingSection.create({
            user_id,
            guidedId: Quotes_data._id,
            sectionName,
            isHide,
            sectionPosition,
          });

          const surveyQuestions = await SurveyQuestion.find({
            surveyId: survey_key,
            surveySectionId: sectionId,
          });
          if (surveyQuestions && surveyQuestions.length > 0) {
            const questionPromises = surveyQuestions.map(
              async ({ ...questionEle }) => {
                const questions = { ...questionEle._doc };
                const {
                  _id: questionId,
                  surveyId,
                  surveySectionId,
                  surveyQuestionId,
                  ...restQuestion
                } = questions;

                const newQuestion = await GuidedSellingQuestions.create({
                  user_id,
                  guidedId: Quotes_data._id,
                  surveySectionId: newSection._id,
                  surveyQuestionId: questions._id,
                  ...restQuestion,
                });
                if (surveyRules && surveyRules.length > 0) {
                  for (let index = 0; index < surveyRules.length; index++) {
                    let ruleElement = surveyRules[index];

                    ruleElement.guidedId = Quotes_data._id;
                    ruleElement.user_id = user_id;
                    // Update root section id
                    ruleElement.sectionId =
                      ruleElement.sectionId.toString() === sectionId.toString()
                        ? newSection._id
                        : ruleElement.sectionId;

                    // Update surveyquestion id with new guided selling question  in condition
                    ruleElement.condition.questionId =
                      ruleElement.condition.questionId.toString() ===
                      questionId.toString()
                        ? newQuestion._id
                        : ruleElement.condition.questionId;

                    if (ruleElement.actions.length > 0) {
                      ruleElement.actions.forEach((x) => {
                        x.actionValue =
                          x.actionValue.toString() === sectionId.toString()
                            ? newSection._id
                            : x.actionValue;
                      });
                    }

                    if (ruleElement.actions.length > 0) {
                      const cellData = await calcModelGS.find({
                        surveyId,
                        guidedId: Quotes_data._id,
                      });
                      ruleElement.actions.forEach((x) => {
                        if (x.actionType === "PROCESS CALC RANGE(PCR)") {
                          if (Array.isArray(cellData) && cellData.length > 0) {
                            const calcData = cellData[0];
                            if (calcData && calcData.data) {
                              // Parse JSON data
                              const jsonData = JSON.parse(calcData.data);
                              // Get sheet names
                              const sheetNames = Object.keys(jsonData.sheets);
                              // Initialize an object to store cell values by sheet name
                              const cellValuesBySheet = {};
                              // Iterate through sheets
                              sheetNames.forEach((sheetName) => {
                                // Get sheet data
                                const sheetData =
                                  jsonData.sheets[sheetName].data.dataTable;
                                if (!sheetData) {
                                  console.error(
                                    `Sheet data for "${sheetName}" is missing or invalid.`
                                  );

                                  return; // Skip processing for this sheet
                                }

                                // Extract cell values with spreadsheet-style cell references

                                const cellValues = Object.entries(
                                  sheetData
                                ).reduce((acc, [row, row_data]) => {
                                  Object.entries(row_data).forEach(
                                    ([col, cell_value]) => {
                                      const colIndex = parseInt(col);
                                      const rowIndex = parseInt(row);
                                      if (!acc[colIndex]) {
                                        acc[colIndex] = [];
                                      }
                                      acc[colIndex].push({
                                        cell: `${String.fromCharCode(
                                          65 + colIndex
                                        )}${rowIndex + 1}`,

                                        value: cell_value.value,
                                      });
                                    }
                                  );

                                  return acc;
                                }, []);

                                // Flatten the array of arrays into a single array

                                const flattenedCellValues = cellValues.flat();

                                // Store cell values in the object

                                cellValuesBySheet[sheetName] =
                                  flattenedCellValues;
                              });

                              // Log or process cell values as needed

                              //  update the spreadsheet

                              const specifiedRange = x.actionValue.pcrCalcCell;

                              // Get selected sheet name from the calcTab state

                              const selectedSheetName =
                                x.actionValue.pcrCalcTab;

                              // Log cell values from the specified range in the selected sheet

                              if (selectedSheetName && specifiedRange) {
                                const sheetValues =
                                  cellValuesBySheet[selectedSheetName];

                                if (sheetValues) {
                                  const [startCell, endCell] =
                                    specifiedRange.split(":");

                                  const startCol = startCell.charCodeAt(0) - 65;

                                  const startRow =
                                    parseInt(startCell.slice(1)) - 1;

                                  const endCol = endCell.charCodeAt(0) - 65;

                                  const endRow = parseInt(endCell.slice(1)) - 1;

                                  const specifiedRangeValues =
                                    sheetValues.filter((cell) => {
                                      const colNum =
                                        cell.cell.charCodeAt(0) - 65;

                                      const rowNum =
                                        parseInt(cell.cell.slice(1)) - 1;

                                      return (
                                        colNum >= startCol &&
                                        colNum <= endCol &&
                                        rowNum >= startRow &&
                                        rowNum <= endRow
                                      );
                                    });

                                  // Extract celldata and valuedata from specifiedRangeValues

                                  // const celldataValues =
                                  //   specifiedRangeValues.map(
                                  //     (cell) => cell.cell
                                  //   );

                                  // const valuedataValues =
                                  //   specifiedRangeValues.map(
                                  //     (cell) => cell.value
                                  //   );

                                  const cell_data = specifiedRangeValues.map(
                                    ({ cell, value }) => ({
                                      celldata: cell,
                                      valuedata: value,
                                    })
                                  );
                                  x.actionValue = {
                                    cell_data,
                                    pcrCalcTab: x.actionValue.pcrCalcTab,
                                    pcrCalcCell: x.actionValue.pcrCalcCell,
                                    calcTabTemplate:
                                      x.actionValue.calcTabTemplate,
                                  };
                                }
                              }
                            }
                          } else {
                            console.error(
                              "Invalid or empty data array:",
                              responseData.data
                            );
                          }
                        } else {
                          x.actionValue =
                            x.actionValue === sectionId.toString()
                              ? newSection._id
                              : x.actionValue === questionId.toString()
                              ? newQuestion._id
                              : x.actionValue;
                        }
                      });
                      // Update surveyquestion and survey section id with new guided selling question and section in actions
                    }

                    surveyRules[index] = ruleElement;
                  }
                }
              }
            );
            await Promise.all(questionPromises);
          }
        }
      );
      await Promise.all(promises);
      await GuidedRules.insertMany(surveyRules);
      res.status(200).json({
        status: "Success",
        message: "Successfully created",
        data: Quotes_data,
      });
    }

    // if (Quotes_data) {
    // } else {
    //   res.status(500).json({ status: "Failed", message: "Failed " });
    // }

    // } else {
    //   res.status(200).json({ status: "Failed", message: "Class Name Already Exists!" })
    // }
  } catch (error) {
    console.log("error", error);
    res
      .status(200)
      .json({ status: "Failed", message: "Failed " + error.message });
  }
};

// update a Quotes
const updateQuotes = async (req, res) => {
  // const user_id = req.user.user_id;
  let user_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    user_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    user_id = req.user._id;
    people_id = null;
  }
  const { class_name, Quotes_accesskey } = req.body;
  // const Quotes_accesskey = md5(user_id+""+class_name+""+new Date());
  try {
    const Quotes = await Quotes.findAll({
      where: { user_id: user_id, Quotes_accesskey: Quotes_accesskey },
    });
    if (Quotes.length > 0) {
      const Quotes_data = await Quotes.update(
        { class_name },
        { where: { Quotes_accesskey: Quotes_accesskey, user_id: user_id } }
      );

      if (Quotes_data) {
        res.status(200).json({
          status: "Success",
          message: "Successfully updated",
          data: Quotes_data,
        });
      } else {
        res.status(200).json({ status: "Failed", message: "Failed " });
      }
    } else {
      res
        .status(200)
        .json({ status: "Failed", message: "Class Name Already Exists!" });
    }
  } catch (error) {
    res
      .status(200)
      .json({ status: "Failed", message: "Failed " + error.message });
  }
};

const getQuotes = async (req, res) => {
  const user = req.user._id;

  if (user) {
    // const user_id = req.user._id;
    let user_id, people_id;

    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }
    const { acc_key, opp_id } = req.body;
    try {
      const Quotes_data = await Quotes.find({
        user_id: user_id,
        account_id: acc_key,
        opportunity_id: opp_id,
      });

      if (!Quotes_data) {
        res
          .status(500)
          .json({ status: "Failed", message: "Loopups Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: Quotes_data });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  }
};

const deleteQuotes = async (req, res) => {
  const user = req.user._id;
  const quotes_id = req.params.quotes_id;
  try {
    const Quotes_data = await Quotes.deleteOne({
      _id: quotes_id,
      // opportunity_id: opp_id,
    });
    if (Quotes_data) {
      const guidedSectionDelete = await GuidedSellingSection.deleteMany({
        guidedId: quotes_id,
      });
      if (guidedSectionDelete) {
        const guidedQuestionDelete = await GuidedSellingQuestions.deleteMany({
          guidedId: quotes_id,
        });
      }
      if (guidedSectionDelete) {
        const guidedRulesDelete = await GuidedRules.deleteMany({
          guidedId: quotes_id,
        });
      }
      if (guidedSectionDelete) {
        const guidedCalcDelete = await GuidedCalcModel.deleteMany({
          guidedId: quotes_id,
        });
      }
      res.status(200).json({ status: "succes", message: "Quotes Deleted2222" });
    } else {
      res.status(500).json({ status: "Error", message: "Quotes Not Found" });
    }
  } catch (error) {
    console.error("Error deleting quptes:", error);
    res.status(500).json({ error: "Failed to Delete quotes" });
  }
};
module.exports = { addQuotes, getQuotes, updateQuotes, deleteQuotes };
