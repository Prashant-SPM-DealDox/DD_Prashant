import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "../../assets/css/addsection/AddAction.css";
const DeleteAction = ({ onDelete }) => {
  const [highlighted, setHighlighted] = useState(false);
  const buttonRef = useRef(null);

  const deleteActionSection = () => {
    onDelete();
    setHighlighted(false);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setHighlighted(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button
        ref={buttonRef}
        className={`dleshowsection ${highlighted ? "highlighted" : ""}`}
        onClick={() => {
          if (!highlighted) {
            setHighlighted(true);
          } else {
            deleteActionSection();
          }
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} id="deleactionrule" />
      </button>
    </div>
  );
};

export default DeleteAction;
