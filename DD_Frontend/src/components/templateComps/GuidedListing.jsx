import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/templatecomps/GuidedListing.css";
import CustomDropdown from "../common/CustomDropdown";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min.js";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { FROALA_LICENSE_KEY } from "../../config";
// import CatalogPopup from "../../components/templateComps/CatalogPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import {
  faFilePdf,
  faFileWord,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import HeaderBar from "../common/HeaderBar";
import { saveAs } from "file-saver";
import { asBlob } from "html-docx-ts";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { toast } from "react-toastify";

function GuidedListing({
  showFlagButton,
  showFlagHeader,
  options,
  doctypePublished,
  doc_tempData,
  updateDocTempData,
  survey_key,
  sKey,
  panelType,
  isReadOnly = false,
  docClicks,
  docTempClicks,
  unsavedChange,
  setUnSavedChange,
}) {
  // console.log(doc_tempData, doctypePublished);
  const user = JSON.parse(localStorage.getItem("user"));
  const { token } = user;
  const [searchParams] = useSearchParams();
  const quoteIds = searchParams.get("quotes");
  // console.log(quoteIds);
  const surveyIds = searchParams.get("template");
  // console.log(quoteIds, surveyIds, "kkkkkkkkkkkkkkkkk");
  const [downloadButtonText, setDownloadButtonText] = useState("GENERATE");
  const [downloadButtonText1, setDownloadButtonText1] = useState("GENERATE");
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [downloadTriggered1, setDownloadTriggered1] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [inputFields, setInputFields] = useState([]);
  const [, setIsOpen] = useState(false);
  const dropdownRefcatalogbtn = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [secName, setSecName] = useState("");
  const [selectedOptionTemplate, setSelectedOptionTemplate] = useState("");
  const [selectedoption1, setSelectedOption1] = useState(null);

  useEffect(() => {
    if (docTempClicks) {
      setSelectedOptionTemplate(options[0] || "");
    }

    // console.log("IN GUIDEDLISTING called");
  }, [docTempClicks]);

  const handleActionSelect1 = (selectedOption) => {
    setSelectedOptionTemplate(selectedOption);
  };

  const editorConfig = {
    key: FROALA_LICENSE_KEY,
    charCounterCount: false,
    wordCounterCount: false,
    toolbarInline: true,
    alwaysVisible: true,
    toolbarVisibleWithoutSelection: true,
    placeholderText: "",
    multiLine: true,
    align: "left",
    imageOutputSize: true,
    tableCellMultipleStyles: true,
    imageMove: true,
    tableResizer: true,
    tableColors: [
      "#61BD6D",
      "#1ABC9C",
      "#54ACD2",
      "#0074D9",
      "#2ECC40",
      "#FFDC00",
      "#FF851B",
      "#FF4136",
      "#85144B",
      "#F012BE",
      "#B10DC9",
      "#111111",
      "#AAAAAA",
      "#DDDDDD",
      "REMOVE",
    ],
    toolbarButtons: [
      [
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "bold",
        "italic",
        "underline",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "align",
        "alignLeft",
        "alignCenter",
        "alignRight",
        "insertLink",
        "insertImage",
        "table",
        "specialCharacters",
        "print",
        "insertTable",
        "clearFormatting",
        "undo",
        "redo",
        "html",
      ],
    ],
    events: {
      initialized: function () {
        const toolbar = document.querySelector(".fr-toolbar");
        if (toolbar) {
          toolbar.style.height = "180px";
          toolbar.style.width = "360px";
          const editor = this;
          editor.$el[0].setAttribute(
            "style",
            "text-align: left;font-size: 12px;"
          );
        }
      },
    },
  };

  useEffect(() => {
    const handleOutsideClickcatalogbtn = (event) => {
      if (
        dropdownRefcatalogbtn.current &&
        !dropdownRefcatalogbtn.current.contains(event.target) &&
        !event.target.classList.contains("popup")
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClickcatalogbtn);
    return () => {
      window.removeEventListener("click", handleOutsideClickcatalogbtn);
    };
  }, []);

  const handleAddField1 = (doc_id, section_id) => {
    // console.log(doc_tempData, doctypePublished);
    const existingDoc = doc_tempData?.find((doc) => doc.doc_id === doc_id);
    // If the document doesn't exist, create a new one
    if (!existingDoc) {
      const newDoc = { doc_id, sections: [] };
      doc_tempData.push(newDoc);
    }
    // Find the document again (either existing or newly created)
    const targetDoc = doc_tempData?.find((doc) => doc.doc_id === doc_id);
    // Check if a section with the given section_id exists in the document
    const existingSection = targetDoc.sections.find(
      (section) => section.section_id === section_id
    );
    // If the section doesn't exist, create a new one
    if (!existingSection) {
      const matchingSection = doctypePublished
        .find((item) => item._id === doc_id)
        .sections.find((sec) => sec._id === section_id);
      if (matchingSection) {
        const newSection = {
          section_id: matchingSection._id,
          // section_name: matchingSection.section_name,
          // section_tag: matchingSection.section_tag,
          section_value: [{ key: 0, value: "" }],
        };
        targetDoc.sections.push(newSection);
      } else {
        console.error("No matching section found in published documents.");
      }
    } else {
      existingSection.section_value.push({
        key: existingSection.section_value.length,
        value: "",
      });
    }
    const newDoctype = doc_tempData?.map((doc) =>
      doc.doc_id === doc_id ? targetDoc : doc
    );
    updateDocTempData(newDoctype);
    setHighlightedIndex(null);
    setSecName("");
    setUnSavedChange(true);
  };

  const handleToggleEditor = (index, sectionName) => {
    if (highlightedIndex === index) {
      handleDeleteField(index, sectionName);
    } else {
      setHighlightedIndex(index);
      setSecName(sectionName);
    }
    setUnSavedChange(true);
  };

  const handleDeleteField = (index, sectionName) => {
    const updatedDocData = doc_tempData?.map((doc) => {
      if (doc.doc_name === selectedOptionTemplate._id) {
        doc.sections.forEach((section) => {
          if (section.section_id === sectionName) {
            section.section_value.splice(index, 1);
          }
        });
      }
      return doc;
    });
    updateDocTempData(updatedDocData);
    setHighlightedIndex(null);
    setSecName("");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.classList.contains("deincatanewGuide")) {
        // setHighlightedIndex(-1);
        setHighlightedIndex(null);
        setSecName("");
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Define a function to trigger the download
  const handleDownloadPdf = async (selectedDocument) => {
    // Add a null check for selectedDocument
    setIsButtonDisabled(true);
    setDownloadButtonText1("Downloading...");
    const uploadedFileName = selectedDocument.template_file;
    const doc_name = selectedDocument.doc_name;
    // console.log(uploadedFileName);
    const backendUrl = `${baseUrl}/api/doctype/download?url=${encodeURIComponent(
      selectedDocument.template_file
    )}`;

    try {
      const response = await fetch(backendUrl, {
        headers: {
          // Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        console.error(
          `Failed to download ${uploadedFileName}: ${response.status}`
        );
        return;
      }
      const blob = await response.blob();
      // Convert the blob content to ArrayBuffer
      const reader = new FileReader();
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        const htmlModule = new DocxtemplaterHtmlModule({
          ignoreUnknownTags: true,
          ignoreCssErrors: true,
        });
        htmlModule.prefix = "~";
        htmlModule.blockPrefix = "";
        // Load the template content into a Docxtemplater instance
        var zip = new PizZip(arrayBuffer);
        var doc = new docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          delimiters: { start: "$", end: "$" },
          modules: [htmlModule],
        });
        // Extract section data based on matching section names
        const sectionData = doc_tempData
          ?.filter((item) => item.doc_id === selectedDocument._id)
          ?.map((doc) => {
            return doc.sections.reduce((acc, section) => {
              // Find the matching section in doctypePublished based on section_id
              const matchingSection = doctypePublished
                .find((item) => item._id === selectedDocument._id)
                .sections.find((sec) => sec._id === section.section_id);
              if (matchingSection) {
                // Add section_tag to the section data
                acc[matchingSection.section_tag] = section.section_value
                  .map((item) => {
                    return item.value;
                  })
                  .join("\n");
              }
              return acc;
            }, {});
          })[0];
        // console.log(sectionData);
        // Set the data for the document
        doc.setData(sectionData);
        // console.log(sectionData);
        try {
          // Render the document
          doc.render();
        } catch (error) {
          console.error("Error rendering document:", error);
          return;
        }
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Initialize the Filestack client
        const client = filestack.init("ATu6ExKvPTfOS49qFhs4vz");
        // Convert the final document Blob to a File
        const file = new File([out], `${doc_name}.latest.docx`, {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Upload the modified file to Filestack
        try {
          // Upload the modified file to Filestack
          const uploadResult = await client.upload(file);
          // console.log("Uploaded file handle:", uploadResult.handle);
          // Convert the uploaded file to PDF
          const conversionOptions = {
            output: { format: "pdf" },
          };
          const convertedFileResult = await client.transform(
            uploadResult.handle,
            conversionOptions
          );
          // console.log(convertedFileResult);
          const backendUrl2 = `${baseUrl}/api/doctype/download?url=${encodeURIComponent(
            client.transform(uploadResult.handle, conversionOptions)
          )}`;
          // Fetch the PDF from the URL and create a blob
          const pdfResponse = await fetch(backendUrl2, {
            headers: {
              // Authorization: `Bearer ${user.token}`,
            },
          });
          const pdfBlob = await pdfResponse.blob();
          // Create a link and download the PDF file directly
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(pdfBlob);
          downloadLink.setAttribute("download", `${doc_name}.latest.pdf`); // Define a name for the PDF file here
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          setDownloadButtonText1("DOWNLOAD");
          setIsButtonDisabled(false);
        } catch (uploadError) {
          console.error("Error uploading file to Filestack:", uploadError);
        }
      };
      reader.readAsArrayBuffer(blob);
      // setDownloadButtonText1("Download");
    } catch (error) {
      console.error("Error processing document:", error);
      setDownloadButtonText1("Download");
      setIsButtonDisabled(false);
    }
  };
  const handleDownloadWord = async (selectedDocument) => {
    const uploadedFileName = selectedDocument.template_file;
    const doc_name = selectedDocument.doc_name;
    // console.log(uploadedFileName, doc_name);
    // console.log(selectedDocument);
    const backendUrl = `${baseUrl}/api/doctype/download?url=${encodeURIComponent(
      selectedDocument.template_file
    )}`;
    // console.log(backendUrl);
    try {
      const response = await fetch(backendUrl, {
        headers: {
          // Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        console.error(
          `Failed to download ${uploadedFileName}: ${response.status}`
        );
        return;
      }
      const blob = await response.blob();
      // Convert the blob content to ArrayBuffer
      const reader = new FileReader();
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;
        const htmlModule = new DocxtemplaterHtmlModule({
          ignoreUnknownTags: true,
          ignoreCssErrors: true,
        });
        htmlModule.prefix = "~";
        htmlModule.blockPrefix = "";
        //Load the template content into a Docxtemplater instance
        var zip = new PizZip(arrayBuffer);
        var doc = new docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
          delimiters: { start: "$", end: "$" },
          modules: [htmlModule],
        });
        // Extract section data based on matching section names
        const sectionData = doc_tempData
          ?.filter((item) => item.doc_id === selectedDocument._id)
          ?.map((doc) => {
            return doc.sections.reduce((acc, section) => {
              // Find the matching section in doctypePublished based on section_id
              const matchingSection = doctypePublished
                .find((item) => item._id === selectedDocument._id)
                .sections.find((sec) => sec._id === section.section_id);
              if (matchingSection) {
                // Add section_tag to the section data
                acc[matchingSection.section_tag] = section.section_value
                  .map((item) => {
                    return item.value;
                  })
                  .join("\n");
              }
              return acc;
            }, {});
          })[0];
        // console.log("Mapped sectionData:", sectionData);
        doc.setData(sectionData);
        try {
          // Render the document
          doc.render();
        } catch (error) {
          console.error("Error rendering document:", error);
          return;
        }
        // Generate the output document as a blob
        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Save the document using saveAs function
        saveAs(out, `${doc_name}.latest.docx`);
      };
      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const fetchImageAsBase64 = async (imgSrc) => {
    const response = await fetch(imgSrc);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  // handleEditorChange function
  const handleEditorChange = async (newValue, sectionName, itemIndex) => {
    const updatedDocTempData = [...doc_tempData];
    const field = updatedDocTempData?.find(
      (item) =>
        item.doc_id ===
        doctypePublished.find((i) => i.doc_name === selectedOptionTemplate)?._id
    );
    if (field) {
      const section = field.sections.find(
        (item) => item.section_id === sectionName
      );
      if (section) {
        // CALC_SHEET_CELL formulas
        const cellFormulaRegex = /#{CALC_SHEET_CELL\((.*?),\s*(.*?)\)}#/g;
        let cellMatch;
        while ((cellMatch = cellFormulaRegex.exec(newValue)) !== null) {
          const sheetName = cellMatch[1];
          const cellReference = cellMatch[2].trim();
          // console.log(sheetName);
          // console.log(cellReference);
          // Find the corresponding value in the sheetArray
          const cellValueObj = sheetArray[sheetName]?.find(
            (cellObj) => cellObj.cell === cellReference
          );
          // Replace the formula with the cell value
          if (cellValueObj) {
            newValue = newValue.replace(cellMatch[0], cellValueObj.value);
          } else {
            // Handle the case where the cell value is not found
            console.warn(`Cell value not found for formula: ${cellMatch[0]}`);
          }
        }
        // Replace CALC_SHEET_TABLE formulas
        const tableFormulaRegex =
          /#{CALC_SHEET_TABLE\((.*?),\s*(.*?)\s*(?:,\s*rer)?\s*(?:,\s*rec)?\)}#/g;
        let tableMatch;
        while ((tableMatch = tableFormulaRegex.exec(newValue)) !== null) {
          const sheetName = tableMatch[1];
          const range = tableMatch[2].trim();
          const removeEmptyRows = /REMOVE_EMPTY_ROWS/.test(tableMatch[0]);
          const removeEmptyCols = /REMOVE_EMPTY_COLUMNS/.test(tableMatch[0]);
          // Extract the start and end cell references from the range
          const [startCell, endCell] = range
            .split(",")
            .map((cell) => cell.trim());
          // Check if the formula syntax is correct
          if (!(sheetName && startCell && endCell)) {
            console.warn(`Invalid table formula syntax: ${tableMatch[0]}`);
            continue; // Skip the invalid formula and move to the next match
          }
          // Find the corresponding values in the sheetArray for the specified range
          const tableValues = sheetArray[sheetName]
            ?.filter((cellObj) =>
              isCellInRange(cellObj.cell, startCell, endCell)
            )
            .reduce((acc, cellObj) => {
              const cellColumn = cellObj.cell.match(/[A-Z]+/)[0].charCodeAt(0);
              const cellRow = parseInt(cellObj.cell.match(/\d+/)[0]);
              const startColumn = startCell.match(/[A-Z]+/)[0].charCodeAt(0);
              const startRow = parseInt(startCell.match(/\d+/)[0]);
              const rowIndex = cellRow - startRow;
              const colIndex = cellColumn - startColumn;
              acc[
                rowIndex *
                  (endCell.match(/[A-Z]+/)[0].charCodeAt(0) -
                    startCell.match(/[A-Z]+/)[0].charCodeAt(0) +
                    1) +
                  colIndex
              ] = cellObj.value;
              return acc;
            }, []);
          // console.log(tableValues);
          // Replace the formula with the table structure
          if (tableValues) {
            const numRows =
              endCell.match(/\d+/)[0] - startCell.match(/\d+/)[0] + 1;
            const numCols =
              endCell.match(/[A-Z]+/)[0].charCodeAt(0) -
              startCell.match(/[A-Z]+/)[0].charCodeAt(0) +
              1;
            let tableStructure =
              '<table border="1" style="border-collapse: collapse; border-spacing: 0; width: 100%;display:table;table-layout:fixed;">';
            // Track non-empty rows and columns
            const nonEmptyRows = new Set();
            const nonEmptyCols = new Set();
            // Check and record non-empty rows and columns
            for (let i = 0; i < numRows; i++) {
              let rowHasData = false; // Flag to track non-empty cells in the row
              for (let j = 0; j < numCols; j++) {
                const cellIndex = i * numCols + j;
                // Ensure cellValue is always treated as a string, even if it's null or undefined
                const cellValue = String(tableValues[cellIndex] || "").trim();
                if (cellValue !== "") {
                  rowHasData = true;
                  nonEmptyCols.add(j);
                }
              }
              if (rowHasData) {
                nonEmptyRows.add(i);
              }
            }
            // Add non-empty rows to the table structure
            for (let i = 0; i < numRows; i++) {
              if (nonEmptyRows.has(i) || !removeEmptyRows) {
                tableStructure += "<tr>";
                for (let j = 0; j < numCols; j++) {
                  if (nonEmptyCols.has(j) || !removeEmptyCols) {
                    const cellIndex = i * numCols + j;
                    const cellValue = tableValues[cellIndex] || "";
                    tableStructure += `<td>${cellValue}</td>`;
                  }
                }
                tableStructure += "</tr>";
              }
            }
            tableStructure += "</table>";
            newValue = newValue.replace(tableMatch[0], tableStructure);
          } else {
            // Handle the case where the table values are not found
            console.warn(
              `Table values not found for formula: ${tableMatch[0]}`
            );
          }
        }
        // Fetch and replace image sources
        const imgElements = newValue.match(/<img[^>]+src="([^">]+)"/g) || [];
        for (const imgElement of imgElements) {
          const imgSrcMatch = /src="([^">]+)"/.exec(imgElement);
          if (imgSrcMatch) {
            const imgSrc = imgSrcMatch[1];
            const base64Data = await fetchImageAsBase64(imgSrc);
            newValue = newValue.replace(imgSrc, base64Data);
          }
        }
        // Update the Froala Editor content
        section.section_value[itemIndex].value = newValue;
        // Force Froala Editor to re-render
        const froalaEditorElement = document.getElementById(
          `froala_editor_${sectionName}_${itemIndex}`
        );
        if (froalaEditorElement) {
          froalaEditorElement.innerHTML = newValue;
        }
      }
    }
    updateDocTempData(updatedDocTempData);
    setUnSavedChange(true);
  };

  // Function to check if a cell is within the specified range
  function isCellInRange(cell, startCell, endCell) {
    // Assuming cell references are in the format A1, B2, etc.
    const cellColumn = cell.match(/[A-Z]+/)[0];
    const cellRow = parseInt(cell.match(/[0-9]+/)[0]);
    const startColumn = startCell.match(/[A-Z]+/)[0];
    const startRow = parseInt(startCell.match(/[0-9]+/)[0]);
    const endColumn = endCell.match(/[A-Z]+/)[0];
    const endRow = parseInt(endCell.match(/[0-9]+/)[0]);

    return (
      cellColumn >= startColumn &&
      cellColumn <= endColumn &&
      cellRow >= startRow &&
      cellRow <= endRow
    );
  }

  const spreadRef = useRef(null);
  const [sheetArray, setSheetArray] = useState([]);
  const getCalcData = async () => {
    if (!quoteIds && !surveyIds) {
      return;
    }
    const calc = spreadRef.current;
    const surveykey = survey_key;
    // console.log("survey_key:", surveykey);
    try {
      const response = await fetch(
        `${baseUrl}/api/spreadgs/displaygs/data/getcalcgs`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            quoteId: quoteIds,
            surveyId: surveyIds,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        // console.log("responseData:", responseData);
        // setSelectedOptionTemplate(options[0] || "");
        if (Array.isArray(responseData.data) && responseData.data.length > 0) {
          const calcData = responseData.data[0];
          // console.log("calcData:", calcData);
          if (calcData && calcData.data) {
            // console.log("Data received:", calcData.data);
            // Parse JSON data
            const jsonData = JSON.parse(calcData.data);
            spreadsheetData(jsonData);
          } else {
            console.error(
              'Invalid data format. Missing "data" property:',
              calcData
            );
          }
        } else {
          console.error("Invalid or empty data array:", responseData.data);
        }
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
    setSelectedOptionTemplate(options[0]);
  };

  const spreadsheetData = (responseData) => {
    // console.log(responseData);
    const sheetNames = Object.keys(responseData?.sheets);
    // console.log(sheetNames);
    // Initialize an object to store cell values by sheet name
    const cellValuesBySheet = {};
    // Iterate through sheets
    sheetNames.forEach((sheetName) => {
      // Get sheet data
      const sheetsData = responseData?.sheets?.[sheetName]?.data?.dataTable;
      if (!sheetsData) {
        console.warn("Sheet data is empty in a sheet");
        return; // Exit the function early
      }
      // Extract cell values with spreadsheet-style cell references
      const cellValues = Object.entries(sheetsData)
        .map(([row, row_data]) =>
          Object.entries(row_data).map(([col, cell_value]) => ({
            cell: `${String.fromCharCode(65 + parseInt(col))}${
              parseInt(row) + 1
            }`,
            value: cell_value.value,
          }))
        )
        .flat();
      // console.log(cellValues);
      // Store cell values in the object
      cellValuesBySheet[sheetName] = cellValues;
    });

    // Log or process cell values as needed
    // console.log("Cell values by sheet:", cellValuesBySheet);
    setSheetArray(cellValuesBySheet);
  };

  useEffect(() => {
    getCalcData();
  }, [docClicks]);

  // Wrapper function to call both handleDownload and handleDownloadWord
  const handleDownloadWrapper = async () => {
    if (downloadTriggered) {
      const selectedDocument = doctypePublished.find(
        (item) => item.doc_name === selectedOptionTemplate
      );
      if (!selectedDocument || !selectedDocument.template_file) {
        toast.error("No file uploaded or template file missing");
        setDownloadButtonText("DOWNLOAD"); // Ensure button text is reset
        return; // Exit the function early
      }
      try {
        await handleDownloadWord(selectedDocument);
        setDownloadButtonText("DOWNLOAD");
      } catch (error) {
        console.error("Error downloading word document:", error);
        toast.error("Error downloading the document.");
        setDownloadButtonText("DOWNLOAD");
        setDownloadTriggered(false);
      }
    } else {
      setDownloadTriggered(true);
      setDownloadButtonText("DOWNLOAD");
    }
  };

  const handleDownloadWrapper1 = async () => {
    if (downloadTriggered1) {
      const selectedDocument = doctypePublished.find(
        (item) => item.doc_name === selectedOptionTemplate
      );
      if (!selectedDocument || !selectedDocument.template_file) {
        toast.error("No file uploaded or template file missing");
        setDownloadButtonText1("DOWNLOAD"); // Ensure button text is reset
        return; // Exit the function early
      }
      try {
        await handleDownloadPdf(selectedDocument);
      } catch (error) {
        console.error("Error downloading PDF document:", error);
        toast.error("Error downloading the PDF.");
        setDownloadButtonText1("DOWNLOAD");
        setDownloadTriggered1(false);
      }
    } else {
      setDownloadTriggered1(true);
      setDownloadButtonText1("DOWNLOAD");
    }
  };

  return (
    <div>
      <div id="headerTempaltesListing">
        <div className="pdfdowWrapper">
          <span
            className={`pdfdowListing ${isButtonDisabled ? "disabled" : ""}`}
            onClick={!isButtonDisabled ? handleDownloadWrapper1 : undefined}>
            <FontAwesomeIcon icon={faFilePdf} id="iconpdf" />
            <label className="pdfdowlabelListing">{downloadButtonText1}</label>
          </span>
          <span className="worddowListing" onClick={handleDownloadWrapper}>
            <FontAwesomeIcon icon={faFileWord} id="iconword" />
            <label className="worddowlabelListing">{downloadButtonText}</label>
          </span>
        </div>
        {showFlagHeader ? (
          <div className="centered-content2">
            <div className="guideapproveGuided">
              <HeaderBar headerlabel={"QUOTE TEMPLATE"} />
            </div>
          </div>
        ) : showFlagButton ? (
          <div className="centered-content1">
            <div className="guideapproveGuided">
              <button className="approveguideGuided">
                &nbsp;&nbsp;SUBMIT FOR APPROVAL&nbsp;&nbsp;
              </button>
            </div>
          </div>
        ) : null}
        <div className="dropdownDoctype">
          <span className="right-align">DOCTYPE</span>
          <div className="customdoctype">
            <CustomDropdown
              custuminput="guidedlistiput"
              options={options}
              onSelect={handleActionSelect1}
              showCancel={true}
              value={selectedOptionTemplate}
              onChange={(value) => setSelectedOption1(value)}
              doctypePublished={doctypePublished}
            />
          </div>
        </div>
      </div>
      <div className="squareboxguide">
        <div>
          {doctypePublished
            ?.filter((item) => item?.doc_name === selectedOptionTemplate)
            ?.map((template) => (
              <>
                {template.sections?.map((section, index) => (
                  <div key={index} className="squarebox">
                    <div
                      className="headerclass-template"
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        background: "#216c98;",
                        marginBottom: "25px",
                      }}
                    >
                      {section?.section_name}
                    </div>
                    {doc_tempData
                      ?.filter(
                        (item) =>
                          item.doc_id ===
                          doctypePublished?.find(
                            (item) => item.doc_name === selectedOptionTemplate
                          )?._id
                      )
                      ?.map((field, index1) => (
                        <div key={index1}>
                          {field.sections
                            ?.filter((item) => item.section_id === section._id)
                            ?.map((field_sec, i) => (
                              <div key={i}>
                                {field_sec.section_value.map(
                                  (sec_item, ind) => (
                                    <div id="froala_delete" key={ind}>
                                      {!panelType && (
                                        <div className="dlefrola">
                                          <button
                                            id={`delete-button-${ind}`}
                                            className={`deincatanewGuide ${
                                              highlightedIndex === ind &&
                                              secName === section._id
                                                ? "deincatanewGuidehighlight"
                                                : ""
                                            }`}
                                          >
                                            <FontAwesomeIcon
                                              icon={faTrashAlt}
                                              id="deleteFreoala"
                                              aria-hidden="true"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleEditor(
                                                  ind,
                                                  section._id
                                                );
                                              }}
                                            />
                                          </button>
                                        </div>
                                      )}
                                      <div className="froalacomp">
                                        <div
                                          className={`froalacomp ${
                                            isReadOnly
                                              ? "froala-editor-read-only"
                                              : ""
                                          }`}
                                        >
                                          {sec_item.value !== null &&
                                            sec_item.value !== undefined && (
                                              <FroalaEditorComponent
                                                config={editorConfig}
                                                model={String(sec_item.value)}
                                                onModelChange={(newValue) =>
                                                  handleEditorChange(
                                                    newValue,
                                                    section._id,
                                                    ind
                                                  )
                                                }
                                              />
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ))}
                        </div>
                      ))}
                    {!panelType && (
                      <div className="temp_froala">
                        {/* <div>
                        <CatalogPopup />
                      </div> */}
                        <div>
                          <button
                            className="newbtn"
                            onClick={() =>
                              handleAddField1(template._id, section._id)
                            }
                          >
                            + NEW
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default GuidedListing;
