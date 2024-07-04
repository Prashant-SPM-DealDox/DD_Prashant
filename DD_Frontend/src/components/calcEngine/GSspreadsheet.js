import React, { useEffect, useRef, useCallback, useState } from "react";
import "../../assets/css/calcengine/calc.css"
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
import GC from "@grapecity/spread-sheets";
import Cookies from "js-cookie";
// import { useAuthContext } from '../hooks/useAuthContext';
import {
  SpreadSheets,
  Worksheet,
  Column,
} from "@grapecity/spread-sheets-react";
import { baseUrl } from "../../config";
import { FaCalculator } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
window.GC = GC;
 
const GSspreadsheet = React.forwardRef(({ quoteIds, surveyIds, toasts, sectionsData, questionsData, showCalcs }, ref) => {
  const [quoteId, setQuoteId] = useState("");
  const [quoteKey, setQuoteKey] = useState("");
  const [surveyKey, setSurveyKey] = useState("");
  const [sheetNames, setSheetNames] = useState([]);
  const [sheetRefresh, setSheetRefresh] = useState(false);
  const [toastShown, setToastShown] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
 
 
  useEffect(() => {
    setQuoteKey(quoteIds);
    setSectionData(sectionsData);
    setQuestionData(questionsData);
  }, [quoteIds, sectionsData, questionsData]);
 
  let hostStyle = {
    width: "100vw-69px",
    height: "400px",
    border: '1px solid #ccc',
  };
 
  const user = JSON.parse(localStorage.getItem("user"));
 
  const { token } = user;
 
  const spreadRef = useRef(null);
 
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/api/spreadgs/displaygs/questiongs`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           quoteId: quoteIds,
  //           // position: position,
  //         }),
  //       }
  //     );
 
  //     if (response.ok) {
  //       const data = await response.json();
  //       setSectionData(data.data.map(sections => sections._id));
  //       setQuestionData(data.question_data);
  //     } else {
  //       console.error("Error fetching data:", response.status);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return null;
  //   }
  // };
 
  // const fetchAnsById = async () => {
  //   try {
 
  //     const response = await fetch(
  //       `${baseUrl}/api/spreadgs/displaygs/answergs`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           quoteId: quoteIds,
  //           // questionKey: questionKey,
  //         }),
  //       }
  //     );
 
  //     if (response.ok) {
  //       const result = await response.json();
  //       setQuestionData(result.data);
  //     } else {
  //       // console.log("Error fetching data:", response.status);
  //       return null;
  //     }
  //   } catch (error) {
  //     // console.log("Error fetching data:", error);
  //     return null;
  //   }
  // };
 
  // useEffect(() => {
  //   fetchData();
  //   fetchAnsById();
  // }, []);
 
  // QUESTION_INDEX CUSTOM FUNCTION
  const QuestionIndexFunction = function () {
    this.typeName = "QUESTION_INDEX";
  };
  QuestionIndexFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("QUESTION_INDEX", 1, 1, {
      name: "QUESTION_INDEX",
      description: "Returns The Question From Value By Index",
    });
 
  QuestionIndexFunction.prototype.evaluate = (context, position) => {
    const questionIndex = new Map();
 
    // Populate questionIndex map with section IDs and index numbers
    sectionData.forEach((section, index) => {
      questionIndex.set(section._id, index + 1);
    });
 
    const sectionQuestions = {};
    questionData.forEach(question => {
      if (!sectionQuestions[question.surveySectionId]) {
        sectionQuestions[question.surveySectionId] = [];
      }
      sectionQuestions[question.surveySectionId].push(question);
    });
 
    Object.entries(sectionQuestions).forEach(([sectionId, questionsInSection]) => {
      const sectionIndex = questionIndex.get(sectionId);
 
      questionsInSection.forEach((question, index) => {
        const questionNumber = index + 1;
        question.questionNumberInSection = `${sectionIndex}.${questionNumber}`;
      });
    });
 
    const filteredData = questionData.filter(item => item.questionPosition === position);
 
    if (filteredData.length > 0) {
      const sortedData = filteredData.sort((a, b) => {
        const sectionIndexA = questionIndex.get(a.surveySectionId);
        const sectionIndexB = questionIndex.get(b.surveySectionId);
        if (sectionIndexA === sectionIndexB) {
          return a.questionPosition - b.questionPosition;
        }
        return sectionIndexA - sectionIndexB;
      });
      context.setAsyncResult(
        sortedData.map(item => `${item.questionNumberInSection} ${item.questionName}`)
      );
      setSurveyKey(sortedData[0].guidedId);
    } else {
      context.setAsyncResult(``);
    }
  };
 
 
  // GET_QUESTION_ID CUSTOM FUNCTION
 
  const GetQuestionIdFunction = function () {
    this.typeName = "GET_QUESTION_ID";
  };
 
  GetQuestionIdFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("GET_QUESTION_ID", 1, 1, {
      name: "GET_QUESTION_ID",
      description: "Returns Question ID From Value By Index",
    });
 
  GetQuestionIdFunction.prototype.evaluate = (context, position) => {
    const filteredData = questionData.filter(item => item.questionPosition === position);
    if (filteredData.length > 0) {
      // const sortedData = filteredData.sort((a, b) => a.questionIndex - b.questionIndex);
      context.setAsyncResult(filteredData[0].surveyQuestionId ? filteredData[0].surveyQuestionId : filteredData[0]._id);
    } else {
      context.setAsyncResult(``);
    }
  };
 
  QuestionIndexFunction.prototype.defaultValue = () => {
    return "Loading...";
  };
 
  const AnswerByIdFunction = function () {
    this.typeName = "ANSWER_BY_ID";
  };
 
  AnswerByIdFunction.prototype =
    new GC.Spread.CalcEngine.Functions.AsyncFunction("ANSWER_BY_ID", 1, 1, {
      name: "ANSWER_BY_ID",
      description: "Returns Answer From Question ID",
    });
 
  AnswerByIdFunction.prototype.evaluate = async (context, questionKey) => {
    const quesKey = typeof questionKey === 'string' ? await questionKey.trim() : questionKey;
    const filteredData = questionData.filter(item => item.surveyQuestionId === quesKey || item._id === quesKey);
    if (filteredData.length > 0 && Object.keys(filteredData[0].answer).length > 0) {
      await context.setAsyncResult(filteredData[0].answer);
    } else {
      await context.setAsyncResult(0);
    }
  };
 
  const addCustomMenuItems = function (spread) {
    var commandManager = spread.commandManager();
    let Commands = GC.Spread.Sheets.Commands;
    // Items to be Added to the Context Menu
    var clearFormattingItem = {
      text: "Clear Formatting",
      name: "clearFormatting",
      command: "clearFormatting",
      workArea: "viewport"
    };
    var clearStyleItem = {
      text: "Clear Style",
      name: "clearStyle",
      command: "clearStyle",
      workArea: "viewport"
    }
    var wrapTextItem = {
      text: "Wrap Text",
      name: "wrapText",
      command: "wrapText",
      workArea: "viewport"
    }
    var backgroundColorItem = {
      text: "Background Color",
      name: "backgroundColor",
      workArea: "viewport",
      subMenu: [
        {
          name: "selectColorPicker",
          command: "bgColor"
        }
      ]
    }
    var numberFormatSubItem1 = {
      text: "1000",
      name: "numberFormatSubItem1",
      command: "numberFormatSubItem1",
    }
    var numberFormatSubItem2 = {
      text: "1,000",
      name: "numberFormatSubItem2",
      command: "numberFormatSubItem2",
    }
    var numberFormatSubItem3 = {
      text: "1000.00",
      name: "numberFormatSubItem3",
      command: "numberFormatSubItem3",
    }
 
    var numberFormatItem = {
      text: "Number",
      name: "numberFormat",
      subMenu: [numberFormatSubItem1, numberFormatSubItem2, numberFormatSubItem3]
    }
 
    var percentFormatSubItem1 = {
      text: "0%",
      name: "percentFormatItem1",
      command: "percentFormatItem1",
    }
 
    var percentFormatSubItem2 = {
      text: "00.00%",
      name: "percentFormatItem2",
      command: "percentFormatItem2",
    }
 
    var percentFormatItem = {
      text: "Percent",
      name: "percentFormat",
      subMenu: [percentFormatSubItem1, percentFormatSubItem2],
      // command: "gc.spread.contextMenu.sortAscend",
    }
    var formatCellsItem = {
      text: "Format Cells",
      name: "formatCells",
      workArea: "viewport",
      subMenu: [
        numberFormatItem, percentFormatItem
      ]
    }
 
    spread.contextMenu.menuData.push(clearFormattingItem);
    spread.contextMenu.menuData.push(clearStyleItem);
    spread.contextMenu.menuData.push(wrapTextItem);
    spread.contextMenu.menuData.push(formatCellsItem);
    spread.contextMenu.menuData.push(backgroundColorItem);
 
    var clearFormatting = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'clearFormattingCmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections()
        });
      }
    };
    var clearStyle = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'clearStyleCmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections()
        });
      }
    };
 
    var wrapText = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'wrapTextCmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections()
        });
      }
    };
 
    var backgroundColor = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'backgroundColorCmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections(),
          color: "red"
        });
      }
    };
 
    var numberFormatSubItem1 = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'numberFormatSubItem1Cmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections(),
        });
      }
    }
 
    var numberFormatSubItem2 = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'numberFormatSubItem2Cmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections(),
        });
      }
    }
 
    var numberFormatSubItem3 = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'numberFormatSubItem3Cmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections(),
        });
      }
    }
 
    var percentFormatSubItem1 = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'percentFormatSubItem1Cmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections(),
        });
      }
    }
 
    var percentFormatSubItem2 = {
      canUndo: false,
      execute: function () {
        commandManager.execute({
          cmd: 'percentFormatSubItem2Cmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections(),
        });
      }
    }
 
    var bgColor = {
      canUndo: false,
      execute: function (spread, options) {
        commandManager.execute({
          cmd: 'selectWithBgCmd',
          sheetName: spread.getActiveSheet().name(),
          selections: spread.getActiveSheet().getSelections(),
          color: options.commandOptions
        });
      }
    }
 
 
    let clearFormattingCmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          let selections = options.selections;
          selections.forEach(function (sel) {
            sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).formatter(null);
          });
          Commands.endTransaction(spread, options);
          return true;
        }
      }
    }
 
    let clearStyleCmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          let selections = options.selections;
          selections.forEach(function (sel) {
            sheet.clear(sel.row, sel.col, sel.rowCount, sel.colCount, GC.Spread.Sheets.SheetArea.viewport,
              GC.Spread.Sheets.StorageType.style);
          });
          Commands.endTransaction(spread, options);
          return true;
        }
      }
    }
 
    let wrapTextCmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          let selections = options.selections;
          selections.forEach(function (sel) {
            sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).wordWrap(true);
          });
          Commands.endTransaction(spread, options);
          return true;
        }
      }
    }
 
    let numberFormatSubItem1Cmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          let selections = options.selections;
          let sheet = spread.getSheetFromName(options.sheetName);
          selections.forEach(function (sel) {
            sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).formatter("0");
          });
          Commands.endTransaction(spread, options);
          return true;
        }
      }
    }
 
    let numberFormatSubItem2Cmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          let selections = options.selections;
          let sheet = spread.getSheetFromName(options.sheetName);
          selections.forEach(function (sel) {
            sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).formatter("#,##0");
          });
          Commands.endTransaction(spread, options);
          return true;
        }
      }
    }
 
    let numberFormatSubItem3Cmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          let selections = options.selections;
          let sheet = spread.getSheetFromName(options.sheetName);
          selections.forEach(function (sel) {
            sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).formatter("0.00");
          });
          Commands.endTransaction(spread, options);
          return true;
        }
      }
    }
 
    let percentFormatSubItem1Cmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          let selections = options.selections;
          let sheet = spread.getSheetFromName(options.sheetName);
          selections.forEach(function (sel) {
            sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).formatter("0%");
          });
          Commands.endTransaction(spread, options);
          return true;
        }
 
      }
    }
 
    let percentFormatSubItem2Cmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          let selections = options.selections;
          let sheet = spread.getSheetFromName(options.sheetName);
          selections.forEach(function (sel) {
            sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).formatter("00.00%");
          });
          Commands.endTransaction(spread, options);
          return true;
        }
 
      }
    }
 
    var selectWithABackgroundColorCmd = {
      canUndo: true,
      execute: function (spread, options, isUndo) {
        if (isUndo) {
          Commands.undoTransaction(spread, options);
          return true;
        } else {
          Commands.startTransaction(spread, options);
          if (options.color) {
            var style = new GC.Spread.Sheets.Style();
            style.backColor = options.color;
            let selections = options.selections;
            let sheet = spread.getSheetFromName(options.sheetName);
            selections.forEach(function (sel) {
              sheet.getRange(sel.row, sel.col, sel.rowCount, sel.colCount).setStyle(style);
            });
          }
          Commands.endTransaction(spread, options);
          return true;
        }
 
      }
    };
 
 
    commandManager.register("clearFormatting", clearFormatting, null, false, false, false, false);
    commandManager.register("clearStyle", clearStyle, null, false, false, false, false);
    commandManager.register("wrapText", wrapText, null, false, false, false, false);
    commandManager.register("backgroundColor", backgroundColor, null, false, false, false, false);
    commandManager.register("backgroundColor", backgroundColor, null, false, false, false, false);
    commandManager.register("numberFormatSubItem1", numberFormatSubItem1, null, false, false, false, false);
    commandManager.register("numberFormatSubItem2", numberFormatSubItem2, null, false, false, false, false);
    commandManager.register("numberFormatSubItem3", numberFormatSubItem3, null, false, false, false, false);
    commandManager.register("percentFormatSubItem1", percentFormatSubItem1, null, false, false, false, false);
    commandManager.register("percentFormatSubItem2", percentFormatSubItem2, null, false, false, false, false);
    commandManager.register("bgColor", bgColor, null, false, false, false, false);
 
 
    commandManager.register("clearFormattingCmd", clearFormattingCmd, null, false, false, false, false);
    commandManager.register("clearStyleCmd", clearStyleCmd, null, false, false, false, false);
    commandManager.register("wrapTextCmd", wrapTextCmd, null, false, false, false, false);
    commandManager.register("numberFormatSubItem1Cmd", numberFormatSubItem1Cmd, null, false, false, false, false);
    commandManager.register("numberFormatSubItem2Cmd", numberFormatSubItem2Cmd, null, false, false, false, false);
    commandManager.register("numberFormatSubItem3Cmd", numberFormatSubItem3Cmd, null, false, false, false, false);
    commandManager.register("percentFormatSubItem1Cmd", percentFormatSubItem1Cmd, null, false, false, false, false);
    commandManager.register("percentFormatSubItem2Cmd", percentFormatSubItem2Cmd, null, false, false, false, false);
    commandManager.register("selectWithBgCmd", selectWithABackgroundColorCmd, null, false, false, false, false);
 
    // BackGround Color Demo
    var colors = ['#F0F8FF', '#FAEBD7', '#00FFFF', '#7FFFD4', '#F0FFFF',
      '#F5F5DC', '#FFE4C4', '#000000', '#FFEBCD', '#0000FF', '#8A2BE2', '#A52A2A', '#DEB887', '#5F9EA0', '#87CEEB', '#D2691E', '#708090', '#6495ED', '#FFF8DC', '#DC143C', '#00FFFF', '#00008B', '#008B8B', '#B8860B', '#C0C0C0', '#FF8C00', '#8FBC8F', '#E9967A', '#FF1493', '#ADFF2F', '#FF4500', '#FFFF00'];
    function createColorpicker() {
      var colorPicker = document.createElement('div');
      colorPicker.className = 'colorPickerContent';
      // Calculate number of rows needed
      var numRows = Math.ceil(colors.length / 8);
 
      for (var i = 0; i < numRows; i++) {
        var row = document.createElement('div');
        row.className = 'colorRow';
        // Add colors to the row
        for (var j = i * 8; j < Math.min((i + 1) * 8, colors.length); j++) {
          var colorDom = document.createElement('div');
          colorDom.className = 'colorDom';
          colorDom.style['backgroundColor'] = colors[j];
          row.appendChild(colorDom);
        }
        colorPicker.appendChild(row);
      }
      return colorPicker;
    }
 
    // customize context menu
    function CustomMenuView() {
    }
 
    CustomMenuView.prototype = new GC.Spread.Sheets.ContextMenu.MenuView();
    CustomMenuView.prototype.createMenuItemElement = function (menuItemData) {
      var self = this;
      if (menuItemData.name === "selectColorPicker") {
        var containers = GC.Spread.Sheets.ContextMenu.MenuView.prototype.createMenuItemElement.call(self, menuItemData);
        var supMenuItemContainer = containers[0];
        while (supMenuItemContainer.firstChild) {
          supMenuItemContainer.removeChild(supMenuItemContainer.firstChild);
        }
        var colorPicker = createColorpicker();
        supMenuItemContainer.appendChild(colorPicker);
        return supMenuItemContainer;
      } else {
        var menuItemView = GC.Spread.Sheets.ContextMenu.MenuView.prototype.createMenuItemElement.call(self, menuItemData);
        return menuItemView;
      }
    };
    CustomMenuView.prototype.getCommandOptions = function (menuItemData, host, event) {
      if (menuItemData && menuItemData.name === "selectColorPicker") {
        var ele = event.target || event.srcElement;
        return ele.style.backgroundColor;
      }
    };
    spread.contextMenu.menuView = new CustomMenuView();
 
  }
 
  const initSpread = useCallback((spread) => {
    spreadRef.current = spread;
    var sheet = spread.getSheet(0);
    addCustomMenuItems(spreadRef.current);
 
    const sheetCount = spread.getSheetCount();
    const sheetInfo = [];
 
    for (let i = 0; i < sheetCount; i++) {
      const sheet = spread.getSheet(i);
      const sheetName = sheet.name();
      const cellRange = getSheetCellRange(sheet);
      sheetInfo.push({ sheetName, cellRange });
    }
 
    setSheetNames(sheetInfo);
    Cookies.set("sheetNames", JSON.stringify(sheetInfo));
 
    if (spread) {
      if (sheetCount > 0) {
        // console.log("Spreadsheet initialized successfully.");
 
        var activeSheet = spread.getActiveSheet();
 
        if (activeSheet) {
          spread.options.allowExtendPasteRange = true;
 
          spread.bind(
            GC.Spread.Sheets.Events.ClipboardPasting,
            function (sender, args) {
              // console.log("Clipboard Pasting Event");
              // console.log(args);
            }
          );
 
          const questionIndex = new QuestionIndexFunction();
          const getQuestionID = new GetQuestionIdFunction();
          const ansById = new AnswerByIdFunction();
 
          spreadRef.current.addCustomFunction(questionIndex);
          spreadRef.current.addCustomFunction(getQuestionID);
          spreadRef.current.addCustomFunction(ansById);
        } else {
          // console.log("ActiveSheet is null. Unable to get row count.");
        }
      } else {
        // console.log("No sheets found in the workbook.");
      }
    } else {
      // console.log("Spread object is null.");
    }
  }, []);
 
  const oldFun = GC.Spread.Sheets.getTypeFromString;
  GC.Spread.Sheets.getTypeFromString = function (typeString) {
    switch (typeString) {
      case "QUESTION_INDEX":
        return QuestionIndexFunction;
 
      case "GET_QUESTION_ID":
        return GetQuestionIdFunction;
 
      case "ANSWER_BY_ID":
        return AnswerByIdFunction;
      default:
        return oldFun.apply(this, arguments);
    }
  };
 
  const getSheetCellRange = (sheet) => {
    const startRow = 1;
    const endRow = sheet.getRowCount();
    const startColumn = 1;
    const endColumn = sheet.getColumnCount();
 
    return `${getColumnName(startColumn)}${startRow}:${getColumnName(
      endColumn
    )}${endRow}`;
  };
 
  const getColumnName = (column) => {
    let columnName = "";
    while (column > 0) {
      const remainder = (column - 1) % 26;
      columnName = String.fromCharCode(65 + remainder) + columnName;
      column = Math.floor((column - 1) / 26);
    }
    return columnName;
  };
 
  const addCalcData = async (callBack = undefined, isFromHandleSaveClick) => {
    let calc = spreadRef.current;
    let calcData = calc.toJSON();
 
    try {
      const response = await fetch(
        `${baseUrl}/api/spreadgs/displaygs/data/addcalcgs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            spreadsheetData: calcData,
            quoteId: quoteIds,
            surveyId: surveyIds,
          }),
        }
      );
 
      if (!response.ok) {
        throw new Error(`Error saving data: ${response.status}`);
      }
 
      const result = await response.json();
      if (callBack) {
        callBack(spreadRef.current);
      }
      if (!toastShown && isFromHandleSaveClick) {
        toast.success("Calc Saved Successfully", {
          icon: (
            <span style={{ color: "rgb(74, 146, 59) " }}>
              <FaCalculator />
            </span>
          ),
          className: "custom-toast_add",
          onClose: () => setToastShown(false),
        });
        setToastShown(true);
      }
      // window.location.reload();
      // await fetchData();
      // await fetchAnsById();
      // if(result){
      //   await getCalcData();
      // }
      // await getCalcData();
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };
 
  const getCalcData = async () => {
    const calc = spreadRef.current;
    try {
      const response = await fetch(
        `${baseUrl}/api/spreadgs/displaygs/data/getcalcgs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            quoteId: quoteIds,
            surveyId: surveyIds,
          }),
        }
      );
 
      if (response.ok) {
        const responseData = await response.json();
 
        if (Array.isArray(responseData.data)) {
          if (responseData.data.length === 0) {
            setSheetRefresh(true);
          } else {
            const calcData =
              responseData.data.length > 0 ? responseData.data[0] : null;
            // const parentCalcData = responseData.parentCalc.length > 0 ? responseData.parentCalc[0] : null;
 
            if (calcData) {
              // Merge data from calcData and parentCalcData
              // const mergedData = {
              //   // ...JSON.parse(parentCalcData.data),
              //   ...JSON.parse(calcData.data),
              // };
 
              // if (Object.keys(mergedData).length > 0) {
              //   setQuoteKey(quoteIds);
              //   setSurveyKey(surveyIds);
              //   spreadRef.current.fromJSON(mergedData);
              //   addCustomMenuItems(spreadRef.current);
              //   // initSpread(calc);
              // } else {
              //   setSheetRefresh(true);
              // }
            // } else if (calcData) {
              // If only calcData has data
              setQuoteKey(quoteIds);
              setSurveyKey(surveyIds);
              spreadRef.current.fromJSON(JSON.parse(calcData.data));
              addCustomMenuItems(spreadRef.current);
              // initSpread(calc);
            } else {
              // console.error('Invalid data format. Both calcData and parentCalcData are missing.');
            }
          }
        } else {
          console.error(
            "Invalid data format. Not an array:",
            responseData.data
          );
        }
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };
 
  useEffect(() => {
    getCalcData();
  }, [showCalcs]);
 
  React.useImperativeHandle(ref, () => ({
    addCalcData,
    getCalcData,
  }));
 
  return (
    <>
      <div className="sample-tutorial">
        <div className="sample-spreadsheets">
          <SpreadSheets workbookInitialized={initSpread} hostStyle={hostStyle}>
            {/* <Worksheet /> */}
          </SpreadSheets>
        </div>
      </div>
    </>
  );
});
 
export default GSspreadsheet;
 
