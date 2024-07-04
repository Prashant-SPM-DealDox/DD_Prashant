import React, { useState, useEffect } from "react";
import DeleteAction from "../addsection/DeleteAction";
import "../../assets/css/addinfo/Addinfo.css";
import HeaderBar from "../common/HeaderBar";
import { faGear, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Addinfo = ({ onCustomFieldsChange, customFields, dynamicFields, handleDynamicFieldsChange }) => {
    console.log(dynamicFields);
    const [flag, setFlag] = useState(true);
    const [inputValues, setInputValues] = useState([]);

    useEffect(() => {
        setInputValues(customFields);
    }, [customFields]);

    const handleAddInputSection = () => {

        setInputValues([
            ...inputValues,
            { fieldName: "", fieldType: "" },
        ]);
    };

    const handleInputChange = (index, event, key) => {
        const updatedInputValues = [...inputValues];
        updatedInputValues[index][key] = (event.target.value).toUpperCase()
        setInputValues(updatedInputValues);
        onCustomFieldsChange(updatedInputValues);
    };


    const handleInputChangeValue = (index, event) => {
        const newValue =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value;
        const updatedInputValues = [...inputValues];
        if (updatedInputValues[index].fieldType === "DATE") {
            dynamicFields[updatedInputValues[index].fieldName] = newValue;
        } else {
            dynamicFields[updatedInputValues[index].fieldName] = newValue;
        }
        handleDynamicFieldsChange(dynamicFields);

        setInputValues(updatedInputValues);
        onCustomFieldsChange(updatedInputValues);
    };

    const formatDate = (date) => {
        if (!date || typeof date !== 'string') return "";

        const formattedDate = new Date(date);
        if (isNaN(formattedDate.getTime())) {
            return "";
        } else {
            return formattedDate.toISOString().split('T')[0];
        }
    }

    const handleInputDelete = async (index) => {
        const updatedInputValues = [...inputValues];
        updatedInputValues.splice(index, 1);
        setInputValues(updatedInputValues);
        onCustomFieldsChange(updatedInputValues);
    }

    return (
        <div className="addinf">
            <div id="grid7">
                <div className="additionalinput" id="additionalbtn">
                    <HeaderBar
                        headerbardiv="headerBar_div_add"
                        isButtonVisible={true}
                        headerlabel="ADDITIONAL INFO"
                    >
                        {!flag ?
                            <div className="right-side-content2" onClick={() => setFlag(!flag)}>
                                <label id="define">Define</label>
                                <FontAwesomeIcon
                                    icon={faGear}
                                    className="gear-icon"
                                    id="fagearai"
                                />
                            </div> :
                            <div className="right-side-content" onClick={() => setFlag(!flag)}>
                                <label id="data">Data</label>
                                <FontAwesomeIcon
                                    icon={faPencilAlt}
                                    className="pencil-icon"
                                    id="fapenai"
                                />
                            </div>
                        }
                    </HeaderBar>
                </div>
            </div>

            {!flag ?
                <div id="grid8">
                    <div id="containeraddinfo" className="column-container">
                        {inputValues.map((fieldName, index) => (
                            <div key={index} className="custom-inputcustomfiled">
                                <>
                                    <div className="dropdown_addinfo">
                                        <div className="input-row">
                                            <select
                                                key={index}
                                                className="input_addinfo"
                                                value={fieldName.fieldType}
                                                onChange={(e) => handleInputChange(index, e, 'fieldType')}
                                            >
                                                <option value="">Select Data Type</option>
                                                <option value="TEXT">TEXT</option>
                                                <option value="BOOLEAN">TOGGLE</option>
                                                <option value="DATE">DATE</option>
                                            </select>
                                            <div className="dele">
                                                <DeleteAction
                                                    onDelete={() => handleInputDelete(index)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                                <input
                                    type="text"
                                    className="inputcustomfield"
                                    id={`ailistinput_${index}`}
                                    value={fieldName.fieldName}
                                    onChange={(e) => handleInputChange(index, e, 'fieldName')}
                                    placeholder="Enter Field Name"
                                />
                            </div>
                        ))}
                        <div id="grid8">
                            <div id="containeraddinfo" className="column-container">
                                <div id="plusiconaddinfo">
                                    <input
                                        type="button"
                                        id="plusbtn"
                                        onClick={handleAddInputSection}
                                        value="+"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div id="grid8">
                    <div id="containeraddinfo" className="column-container">
                        {inputValues
                            .filter(field => field.fieldName !== '' && field.fieldType !== '')
                            .map((field, index) => (
                                <div key={index} className="custom-inputcustomfiled">
                                    <>
                                        <div className="dropdown_addinfo">
                                            <div className="input-row2">
                                                {field.fieldType === "TEXT" && (
                                                    <input
                                                        type="text"
                                                        className="input_addinfo2"
                                                        value={dynamicFields[field?.fieldName] || ''}
                                                        onChange={(e) => handleInputChangeValue(index, e)}
                                                    />
                                                )}
                                                {field.fieldType === "BOOLEAN" && (
                                                    <input
                                                        type="checkbox"
                                                        className="input_addinfo2_checkmark"
                                                        checked={dynamicFields[field.fieldName] === true || false}
                                                        onChange={(e) => handleInputChangeValue(index, e)}
                                                    />
                                                )}
                                                {field.fieldType === "DATE" && (
                                                    <input
                                                        type="date"
                                                        className="input_addinfo2"
                                                        //onClick={() => handleInputClick(index)}
                                                        value={formatDate(dynamicFields[field.fieldName])}
                                                        onChange={(e) => handleInputChangeValue(index, e)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                    <input
                                        type="text"
                                        className="inputcustomfield2"
                                        readOnly
                                        id={`ailistinput_${index}`}
                                        value={field.fieldName}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Addinfo;