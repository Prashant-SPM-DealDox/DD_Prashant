import { useState, useRef, useEffect } from "react";
import React from "react";
import "../../assets/css/common/SidePanel.css";
import CustomDropdown from "./CustomDropdown";
import DocTypeDropdownAll from "../../components/doctypeSidePanel/DoctypeSidePanel";
import { useAuthContext } from "../../hooks/useAuthContext";
import { baseUrl } from "../../config";
import Select from "react-select";
import {
  FaAngleUp,
  FaAngleDown,
  FaCheck,
  FaPlus,
  FaTimes,
  FaClone,
  FaPaperPlane,
} from "react-icons/fa";
import { json } from "react-router-dom";

const AccountsSidebar = ({
  showFlagFiles,
  showFlagRole,
  showFlagNotes,
  showFlagExternalReference,
  showFlagExternal,
  showFlagTimeStamp,
  showFlagInternal,
  showFlagLink,
  showFlagSkill,
  showFlagExchangeRates,
  showFlagBidTeam,
  showFlagPdfdocument,
  showFlagWorddocument,
  showFlagDocumentExport,
  showFlagDoctypeAll,
  showTopAccounts,
  showTopProjects,
  showTopOpportuinity,
  doctypePublished,
  updateOptionsDoctype,
  selectedOptionsContentdoctype,
  catalogRoles,
  updateSelectedRoles,
  DbRoles,
  createdBy,
  modifiedBy,
  createdAt,
  modifiedAt,
  revision,
  accountId,
  bidTeam,
  onClose,
  panelType,
  setUnSavedChange,
  exterRefId1,
  exterRefId2,
  crmRef
}) => {
  const { user } = useAuthContext();

  const [timestamp, setTimeStamp] = useState(false);
  const [notes, setNotes] = useState(false);
  const [extRefs, setExtRef] = useState(false);
  const [external, setExternal] = useState(false);
  const [files, setFiles] = useState(false);
  const [selectFile, setSelectedFile] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [links, setLinks] = useState(false);
  const [inputLink, setinputLink] = useState("");
  const [internalsId, setInternalsId] = useState(false);
  const [internalIdValue, setInternalIdValue] = useState(null);
  const [Skill, setSkill] = useState(false);
  const [Role, setRole] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownskill, setShowDropdownskill] = useState(false);
  const [showInputex, setShowInputex] = useState(false);
  const [bidInput, setBidInput] = useState("");
  const [bidCrossVisible, setBidCrossVisible] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [documentWrite, setDocumentWrite] = useState(false);
  const [showOptionspdf, setShowOptionspdf] = useState(false);
  const [bidTeams, setBidTeams] = useState(false);
  const [doctypes, setDoctypes] = useState(false);
  const dropdownRefexchange = useRef(null);
  const dropdownRef = useRef(null);
  const copyLinkRef = useRef(null);
  const internalIdRef = useRef(null);
  const dropdownRefgenworddoc = useRef(null);
  const [, setSelectedOption] = useState(null);
  const [topProjects, settopProjects] = useState(false);
  const [topAccounts, settopAccounts] = useState(false);
  const [topOpportunity, settopOpportunity] = useState(false);
  const dropdownRefpdf = useRef(null);
  const [DoctypeSelectoption, setDoctypeSelectoption] = useState([]);

  const handleOpenTimeStamp = () => {
    setTimeStamp(!timestamp);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setExtRef(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };
  const handleOpenNotes = () => {
    setNotes(!notes);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setSkill(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };
  const handleExterRef = () => {
    setExtRef(!extRefs);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };
  const handleExternal = () => {
    setExternal(!external);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };
  const handleFiles = () => {
    setFiles(!files);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };

  const handleSelectFile = (event) => {
    setWrong(false);
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFiles(!files);
  };

  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(inputLink);
  };
  const handleChangeLink = () => {
    setLinks(!links);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };
  const handleInternalIdLink = () => {
    window.navigator.clipboard.writeText(accountId);
  };
  const handleInternalsId = () => {
    setInternalsId(!internalsId);
  };
  const handleSkill = () => {
    setSkill(!Skill);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
    if (!Skill) {
      setShowDropdownskill(false);
    }
  };
  const handleRole = () => {
    setRole(!Role);
    setBidTeams(false);
    setDocumentWrite(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);

    if (!Role) {
      setShowDropdown(false);
    }
  };
  const handleBidTeam = () => {
    setBidTeams(!bidTeams);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setShowInputex(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };
  const DisplayIcon = (e) => {
    const values = e.target.value;
    setBidInput(values);
    if (values.trim() !== "") {
      setBidCrossVisible(true);
    } else {
      setBidCrossVisible(false);
    }
  };

  const handlebidInputEmpty = () => {
    setBidInput("");
    setBidCrossVisible(false);
  };
  const toggleOptionspdf = () => {
    setShowOptionspdf(!showOptionspdf);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setDoctypes(false);
    setShowInputex(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setBidTeams(false);
    setDocumentWrite(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setShowInputex(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };
  const handleDocument = () => {
    setDocumentWrite(!documentWrite);
    setBidTeams(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setShowInputex(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    settopOpportunity(false);
    settopAccounts(false);
    settopProjects(false);
  };
  const handleTopAccounts = () => {
    settopAccounts(!topAccounts);
  };
  const handleTopOpportunity = () => {
    settopOpportunity(!topOpportunity);
  };
  const handleTopprojects = () => {
    settopProjects(!topProjects);
  };
  const handleActionDoctype = (option) => {
    setDoctypeSelectoption(option);
  };
  const optionsdoctype = [
    "amulya",
    "xyz",
    "preetha",
    "justin",
    "sharon",
    "shyla",
    "john",
    "hebel",
  ];

  const optionsroles =
    catalogRoles && catalogRoles.map((role) => ({ value: role, label: role }));

  const optionskills = ["item1", "item2", "item3", "item4", "item5"];
  const handleActionSelect1 = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handlePlusClick = () => {
    setShowDropdown(true);
  };
  const handlePlusskillClick = () => {
    setShowDropdownskill(true);
  };
  const handleDocType = () => {
    setDoctypes(!doctypes);
    setBidTeams(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setDocumentWrite(false);
    setShowInputex(false);
  };

  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleRoleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions);
    updateSelectedRoles(selectedOptions); // Call the callback function
  };

  // ***************************************************************************************************
  const toggleInputrates = () => {
    setShowInputex(!showInputex);
    setBidTeams(false);
    setRole(false);
    setSkill(false);
    setNotes(false);
    setExternal(false);
    setFiles(false);
    setLinks(false);
    setShowOptions(false);
    setShowOptionspdf(false);
    setDoctypes(false);
    setTimeStamp(false);
    setExtRef(false);
    setInternalsId(false);
    setDoctypes(false);
    setDocumentWrite(false);
  };
  const [topAccounts1Value, settopAccounts1Value] = useState("$7.52M");

  const [topAccounts2Value, settopAccounts2Value] = useState("$240k");

  const [topAccounts3Value, settopAccounts3Value] = useState("$0");

  const [topAccounts4Value, settopAccounts4Value] = useState("$0");

  const [topAccounts5Value, settopAccounts5Value] = useState("$0");

  const [child1State, setChild1State] = useState([]);

  const updateChild1State = (data) => {
    setChild1State(data);
    updateOptionsDoctype(data);
  };
  //  ==========================================================================================
  return (
    <div className="sidePanelBox">
      <div className="SidePanelButton">
        <button className="sideButton" onClick={onClose}>
          &#x003E;
        </button>
      </div>
      <div className="sidePanelLine">
        {showFlagBidTeam && (
          <div id="bidTeamDiv">
            <div id="bidInternalDiv">
              <button onClick={handleBidTeam} id="bidTeamButton">
                BID TEAM
                {bidTeams ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleBidTeam}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleBidTeam}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>
            {bidTeams && (
              <div id="bidExternalDiv" ref={dropdownRefexchange}>
                {/* <input
                type="text"
                id="bidIteminput"
                value={bidInput}
                onChange={DisplayIcon}
                placeholder="Enter here to Search"
                required
              /> */}

                <div className="profile-icon_sidepanel">
                  {bidTeam
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
                {bidTeam}
                {/* {bidCrossVisible && (
                  <FaTimes
                    // onClick={removeFile}
                    style={{ color: "#216c98"}}
                    id="bidItemCross"
                    onClick={handlebidInputEmpty}
                  />
                )} */}
                <div>
                  <FaCheck />
                </div>
              </div>
            )}
            <hr />
          </div>
        )}
        {/* {showFlagFiles && (
          <div id="filesDiv">
            <div id="filesInternalDiv">
              <button id="InternalIdbutton" onClick={handleFiles}>
                FILES
                {files ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleFiles}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleFiles}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>
            {files && (
              <div id="filesExternalDiv">
                {selectFile && (
                  <div id="filecontents">
                    <p id="selectFile">{selectFile.name}</p>
                    <FaCheck
                      style={{
                        display: wrong ? "none" : "block",
                        color: "#216C98",
                      }}
                      onClick={() => setWrong(!wrong)}
                    />
                    {wrong && (
                      <div>
                        <FaTimes
                          onClick={removeFile}
                          style={{ color: "red" }}
                        />
                      </div>
                    )}
                  </div>
                )}
                <hr
                  style={{
                    borderBottom: "1px solid #ccc;",
                    borderWidth: "0.1px",
                    fontWeight: 100,
                  }}
                />

                <label id="fileContent">
                  <span className="plusFont">
                    <FaPlus />
                  </span>

                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleSelectFile}
                  />
                </label>
              </div>
            )}

            <hr />
          </div>
        )}
        {showFlagNotes && (
          <div id="notesDiv">
            <div id="notesInnerDiv">
              <button id="notesbutton" onClick={handleOpenNotes}>
                NOTES{" "}
                {notes ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleOpenNotes}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleOpenNotes}
                    style={{ float: "right" }}
                  />
                )}
              </button>
              <hr />
            </div>

            {notes && (
              <div id="nots" ref={dropdownRef}>
                <div id="notesouterdiv">
                  <input
                    type="text"
                    placeholder="Type Your Note.."
                    id="noteInput"
                  />
                  <button className="sideplane">
                    <FaPaperPlane onClick={handleInternalIdLink} />
                  </button>
                  <hr />
                </div>
              </div>
            )}
          </div>
        )} */}
        {showFlagExternalReference && (
          <div id="ExternalReferencediv">
            <div id="ExtRefInnerDiv">
              <button id="extRefbutton" onClick={handleExterRef}>
                EXTERNAL REFERENCES
                {extRefs ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleExterRef}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleExterRef}
                    style={{ float: "right" }}
                  />
                )}
              </button>
              <hr />
            </div>
            {extRefs && (
              <div id="ExtRefOuterDiv" ref={dropdownRefexchange}>
                <input type="text" id="ExtRef1" value={exterRefId1}/>
                <label htmlFor="" id="extReflabel1">
                  EXTERNAL REFERENCE ID
                </label>
                <hr />
                <input type="text" id="ExtRef2" value={exterRefId2}/>
                <label htmlFor="" id="extReflabel2">
                  EXTERNAL REFERENCE ID 2
                </label>
                <hr />
                <input type="text" id="ExtRef3" value={crmRef}/>
                <label htmlFor="" id="extReflabel3">
                  CRM REFERENCE
                </label>
                <hr />
              </div>
            )}
          </div>
        )}
        {/* {showFlagExternal && (
          <div id="Externalseconddiv">
            <div id="ExtsecondInnerDiv">
              <button id="extsecondbutton" onClick={handleExternal}>
                EXTERNAL REFERENCES
                {external ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleExternal}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleExternal}
                    style={{ float: "right" }}
                  />
                )}
              </button>
              <hr />
            </div>
            {external && (
              <div id="ExtsecondOuterDiv" ref={dropdownRefexchange}>
                <input
                  type="text"
                  placeholder="External Reference Id"
                  id="Extsecond"
                />
                <label htmlFor="" id="extsecondlabel">
                  EXTERNAL REFERENCE ID
                </label>
              </div>
            )}
          </div>
        )} */}
        {showFlagRole && (
          <div id="Rolediv">
            <div id="RoleInnerDiv">
              <button id="Rolebutton" onClick={handleRole}>
                ROLES
                {Role ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleRole}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleRole}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>
            {Role && (
              <div id="RoleOuter" ref={dropdownRefexchange}>
                <ul className="roleList">
                  {DbRoles.map((role, index) => (
                    <li key={index} className="role_list">
                      {role}
                    </li>
                  ))}
                </ul>
                {showDropdown && (
                  <>
                    <div className="sidePanelContainer">
                      <Select
                        isMulti
                        name="roles"
                        options={optionsroles}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleRoleChange}
                        value={selectedRoles}
                      />
                    </div>
                  </>
                )}
                {showDropdown ? null : (
                  <span className="plusFont" onClick={handlePlusClick}>
                    <FaPlus />
                  </span>
                )}
              </div>
            )}
            <hr />
          </div>
        )}
        {showFlagSkill && (
          <div id="Skilldiv">
            <div id="SkillInnerDiv">
              <button id="skillbutton" onClick={handleSkill}>
                SKILL
                {Skill ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleSkill}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleSkill}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>
            {Skill && (
              <div id="SkillOuter" ref={dropdownRefexchange}>
                {showDropdownskill ? null : (
                  <span className="plusFont" onClick={handlePlusskillClick}>
                    <FaPlus />
                  </span>
                )}
                {showDropdownskill && (
                  <CustomDropdown
                    options={optionskills}
                    onSelect={handleActionSelect1}
                    Placeholder={"Select skill"}
                  />
                )}
              </div>
            )}
            <hr />
          </div>
        )}
        {showFlagTimeStamp && (
          <div id="account1div">
            <div id="accountOuterDiv">
              <button id="timestamp" onClick={handleOpenTimeStamp}>
                TIMESTAMP
                {timestamp ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleOpenTimeStamp}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleOpenTimeStamp}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>
            {timestamp && (
              <div
                id="accountInnerDiv"
                style={{ display: timestamp ? "block" : "none" }}
                ref={dropdownRefexchange}
              >
                <table className="timestampsTable">
                  <tbody>
                    <tr className="timepstamp_row">
                      <td className="timestamplabels">CREATED BY:</td>
                      <td className="timestamp_values">{createdBy}</td>
                    </tr>
                    <tr className="timepstamp_row">
                      <td className="timestamplabels">CREATED:</td>
                      <td className="timestamp_values">{createdAt}</td>
                    </tr>
                    <tr className="timepstamp_row">
                      <td className="timestamplabels">LAST MODIFIED BY:</td>
                      <td className="timestamp_values">{modifiedBy}</td>
                    </tr>
                    <tr className="timepstamp_row">
                      <td className="timestamplabels">LAST MODIFIED:</td>
                      <td className="timestamp_values">{modifiedAt}</td>
                    </tr>
                    <tr className="timepstamp_row">
                      <td className="timestamplabels">REVISION:</td>
                      <td className="timestamp_values">{revision}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <hr />
          </div>
        )}
        {showFlagInternal && (
          <div id="topOppDiv">
            <div id="internalInnerDiv">
              <button id="InternalIdbutton" onClick={handleInternalsId}>
                INTERNAL ID{" "}
                {internalsId ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleInternalsId}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleInternalsId}
                    style={{ float: "right" }}
                  />
                )}
              </button>

              <hr />
            </div>

            {internalsId && (
              <div id="InternalOuterDiv" ref={dropdownRefexchange}>
                {/* <input
                type="text"
                ref={internalIdRef}
                value={internalIdValue}
                onChange={(e) => setInternalIdValue(e.target.value)}
                id="internalIdInput"
                readOnly
              /> */}
                {accountId}
                <button className="sideclone">
                  <FaClone onClick={handleInternalIdLink} size={13} />
                </button>
                {/* <hr /> */}
              </div>
            )}
          </div>
        )}
        {showFlagLink && (
          <div id="LinkDiv">
            <div id="linkOuterDiv">
              <button onClick={handleChangeLink} id="linkButton">
                LINK{" "}
                {links ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleChangeLink}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleChangeLink}
                    style={{ float: "right" }}
                  />
                )}
              </button>
              <hr />
            </div>
            {links && (
              <div id="innerDiv" ref={dropdownRefexchange}>
                <input
                  type="text"
                  id="linkInput"
                  value={inputLink}
                  ref={copyLinkRef}
                  onChange={(e) => setinputLink(e.target.value)}
                  readOnly
                />
                <button className="sideclone">
                  <FaClone onClick={handleCopyLink} />
                </button>
                <hr />
              </div>
            )}
          </div>
        )}
        {showFlagExchangeRates && (
          <div className="exchrates">
            <button id="Exchangebutton" onClick={toggleInputrates}>
              EXCHANGE RATES
              {showInputex ? (
                <FaAngleUp
                  id="iconFontSize"
                  onClick={toggleInputrates}
                  style={{ float: "right" }}
                />
              ) : (
                <FaAngleDown
                  id="fontSize"
                  onClick={toggleInputrates}
                  style={{ float: "right" }}
                />
              )}
            </button>
            <div className="inputdivexchange" ref={dropdownRefexchange}>
              {showInputex && (
                <div>
                  <ul id="noavexra">
                    <li id="noavlabellist">NO AVAILABLE EXCHANGE RATES</li>
                  </ul>
                </div>
              )}
            </div>
            <hr />
          </div>
        )}

        {showFlagDoctypeAll && (
          <div id="Doctypediv">
            <div id="DoctypeInnerDiv">
              <button id="Doctypebutton" onClick={handleDocType}>
                DOCTYPES
                {doctypes ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleDocType}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleDocType}
                    style={{ float: "right" }}
                  />
                )}
              </button>
              <hr />
            </div>
            {doctypes && (
              <div id="doctype">
                <DocTypeDropdownAll
                  doctypePublished={doctypePublished}
                  onSelect={handleActionDoctype}
                  label="All"
                  updateChild1State={updateChild1State}
                  selectedOptionsContentdoctype={selectedOptionsContentdoctype}
                  panelType={panelType}
                  setUnSavedChange={setUnSavedChange}
                />
              </div>
            )}
          </div>
        )}

        {showTopAccounts && (
          <div id="TopAccountsDiv">
            <div id="TopAccountsOuterDiv">
              <button id="topAccounts" onClick={handleTopAccounts}>
                TOP ACCOUNTS
                {topAccounts ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleTopAccounts}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleTopAccounts}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>

            <div id="TopAccountsInnerDiv">
              {topAccounts && (
                <div>
                  <div id="topDiv1">
                    <label className="label1">1030 Tech LLC</label>

                    <input
                      type="text"
                      id="input1"
                      value={topAccounts1Value}
                      onChange={(e) => {
                        settopAccounts1Value(e.target.value);
                      }}
                    />
                  </div>

                  <hr />

                  <div id="topDiv2">
                    <label id="label2">ABB AG</label>

                    <input
                      type="text"
                      id="input2"
                      value={topAccounts2Value}
                      onChange={(e) => {
                        settopAccounts2Value(e.target.value);
                      }}
                    />
                  </div>

                  <hr />

                  <div id="topDiv3">
                    <label id="label3">"Config" Bartosz Zareba</label>

                    <input
                      type="text"
                      id="input3"
                      value={topAccounts3Value}
                      onChange={(e) => {
                        settopAccounts3Value(e.target.value);
                      }}
                    />
                  </div>

                  <hr />

                  <div id="topDiv4">
                    <label id="label4">General Dynamics Information</label>

                    <input
                      type="text"
                      id="input4"
                      value={topAccounts4Value}
                      onChange={(e) => {
                        settopAccounts4Value(e.target.value);
                      }}
                    />
                  </div>
                  <hr />
                  <div id="topDiv5">
                    <label id="label5">Tarborda Solution Incor</label>
                    <input
                      type="text"
                      id="input5"
                      value={topAccounts5Value}
                      onChange={(e) => {
                        settopAccounts5Value(e.target.value);
                      }}
                    />
                  </div>
                  <hr />
                  <button id="seeAll">SEE ALL</button>
                </div>
              )}
              <hr />
            </div>
          </div>
        )}
        {showTopOpportuinity && (
          <div id="TopOpportuinity">
            <div id="topOpportunityOuterDiv">
              <button id="topOpportunity" onClick={handleTopOpportunity}>
                TOP OPPORTUNITY
                {topOpportunity ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleTopOpportunity}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleTopOpportunity}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>

            {topOpportunity && (
              <div id="topOpportunityHiddenDiv">
                <div id="topOppDiv1">
                  <div id="subdiv1">
                    <label id="label12">25-04-23_T&M</label>

                    <label id="label13">1030TECH LLC</label>
                  </div>

                  <div id="subDiv2">
                    <input type="text" id="input6" value={"$7.52M"} />
                  </div>
                </div>

                <div id="topOppDiv2">
                  <div id="subdiv2">
                    <label id="label12">060123</label>

                    <label id="label13">1030TECH LLC</label>
                  </div>

                  <div id="subDiv2">
                    <input type="text" id="input7" value={"$240k"} />
                  </div>
                </div>

                <div id="topOppDiv3">
                  <div id="subdiv3">
                    <label id="label2">MK Test_Oppty_EDU_22</label>

                    <label id="label13">ABB AG</label>
                  </div>

                  <div id="subDiv2">
                    <input type="text" id="input8" value={"$0"} />
                  </div>
                </div>

                <div id="topOppDiv1">
                  <div id="subdiv1">
                    <label id="label12">14-02-23 Fixed Fee</label>

                    <label id="label13">1030TECH LLC</label>
                  </div>

                  <div id="subDiv2">
                    <input type="text" id="input9" value={"$0"} />
                  </div>
                </div>

                <div id="topOppDiv1">
                  <div id="subdiv1">
                    <label id="label12">24-05-22_T&M</label>

                    <label id="label13">BAHARAIN TELECOMMUNICATION COM</label>
                  </div>

                  <div id="subDiv2">
                    <input type="text" id="input10" value={"$0"} />
                  </div>
                </div>
              </div>
            )}
            <hr />
          </div>
        )}

        {showTopProjects && (
          <div id="TopProjects">
            <div id="TopProjectsOuterDiv">
              <button id="topProjects" onClick={handleTopprojects}>
                TOP PROJECTS
                {topProjects ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={handleTopprojects}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={handleTopprojects}
                    style={{ float: "right" }}
                  />
                )}
              </button>

              <hr />
            </div>

            <div id="TopProjectsInnerDIv">
              {topProjects && (
                <div>
                  <button id="projectsSeeAll">SEE ALL</button>

                  <hr />
                </div>
              )}
            </div>
          </div>
        )}
        {showFlagDocumentExport && (
          <div id="documentExportDiv">
            <div id="documentInnerDiv">
              <button id="documentexportbtn" onClick={handleDocument}>
                DOCUMENT EXPORT NAME
                {internalsId ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={toggleOptions}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={toggleOptions}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>
            {documentWrite && (
              <div id="documentOuterDiv" ref={dropdownRefexchange}>
                <input type="text" id="documentwriteInput" />
                <label htmlFor="" id="documentwriteLabel">
                  DOCUMENT EXPORT NAME
                </label>
              </div>
            )}
            {
              <hr
                style={{
                  display: documentWrite ? "none" : "block",
                  color: "#ccc",
                }}
              />
            }
          </div>
        )}
        {/* GENERATED WORD DOCS start */}
        {showFlagWorddocument && (
          <div className="wordGeneratepdf">
            <div id="wordInternalDiv">
              <button id="wordGeneratebutton" onClick={toggleOptions}>
                GENERATED WORD DOCS
                {showOptions ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={toggleOptions}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={toggleOptions}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>

            <div className="inputdivexfegenworddoc" ref={dropdownRefgenworddoc}>
              {showOptions && (
                <>
                  <div className="geneartepdfOptions" ref={dropdownRefexchange}>
                    {/* Render your dropdown options here */}
                    <ul id="generatePdflist">
                      <li>THERE ARE NO GENERATED DOCUMENTS YET</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
            <hr />
          </div>
          // {/* GENERATED WORD DOCS start */}
        )}
        {/* geerated pdf code start */}
        {showFlagPdfdocument && (
          <div className="generatePdf">
            <div id="pdfInternalDiv">
              <button id="pdfButton" onClick={toggleOptionspdf}>
                {" "}
                GENERATED PDF
                {showOptionspdf ? (
                  <FaAngleUp
                    id="iconFontSize"
                    onClick={toggleOptionspdf}
                    style={{ float: "right" }}
                  />
                ) : (
                  <FaAngleDown
                    id="fontSize"
                    onClick={toggleOptionspdf}
                    style={{ float: "right" }}
                  />
                )}
              </button>
            </div>
            <div className="inputdivexfepdf" ref={dropdownRefpdf}>
              {showOptionspdf && (
                <div className="pdflist" ref={dropdownRefexchange}>
                  {/* Render your dropdown options here */}
                  <ul className="pdful">
                    <li id="pdfli">THERE ARE NO GENERATED DOCUMENTS YET</li>
                  </ul>
                </div>
              )}
              <hr />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AccountsSidebar;
