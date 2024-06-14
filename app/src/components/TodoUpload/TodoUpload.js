import React, { useState, useRef } from 'react';
import { FaFileUpload } from "react-icons/fa";
import Papa from 'papaparse';
import './TodoUpload.css';

const TodoUpload = ({ validateAndUploadTodos, userId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          if (results.data.length > 0 && (!results.data[results.data.length - 1].task || !results.data[results.data.length - 1].category)) {
            results.data.pop();
          }

          const { isValid, message } = validateFile(results.data);
          if (isValid) {
            setLoading(true);
            const result = await validateAndUploadTodos(results.data, userId);
            setLoading(false);
            if (result.success) {
              setShowPopup(false);
            } else {
              setValidationMessage(result.message);
            }
          } else {
            setValidationMessage(message);
          }
        },
        error: (error) => {
          console.error('PapaParse error:', error);
        }
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const { isValid, message } = validateFile(results.data);
          if (isValid) {
            setLoading(true);
            const result = await validateAndUploadTodos(results.data, userId);
            setLoading(false);
            if (result.success) {
              setShowPopup(false);
            } else {
              setValidationMessage(result.message);
            }
          } else {
            setValidationMessage(message);
          }
        },
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const validateFile = (data) => {
    const validCategories = ['personal', 'business'];
    let isValid = true;
    let message = "";
  
    data.forEach((row) => {
      if (!row.task || !row.category || !validCategories.includes(row.category.toLowerCase())) {
        isValid = false;
        message = "Error in category column!";
      }
    });
  
    return { isValid, message };
  };

  const closePopup = () => {
    setShowPopup(false);
    setValidationMessage("");
  };

  return (
    <div className="TodoUpload">
      <div className="upload-circle" onClick={() => setShowPopup(true)}>
        <FaFileUpload />
      </div>
      {showPopup && (
        <div className="upload-popup">
          <div className="upload-popup-content">
            <h3>Upload your CSV file</h3>
            <p className="upload-instructions">
              Your CSV file should have the following columns: <strong>task</strong>, <strong>category</strong>
            </p>
            <p>Drag and drop the file here or click to select from your device</p>
            <div
              className="drop-zone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              {loading ? <div className="loading-spinner"></div> : "Drop your file here or click to select"}
            </div>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {validationMessage && <p className="validation-message error">{validationMessage}</p>}
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoUpload;
