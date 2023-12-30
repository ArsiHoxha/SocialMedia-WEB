import React from "react";
import "../ComponentsStyle/Popup.css";
import axios from "axios";
import { useState } from "react";
const PopUp = ({ isOpen, handleClose, handleSave }) => {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData);
      setUploadedFile(response.data.filename);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Your Customization Window</h2>

          <div>
            <form
              method="post"
              enctype="multipart/form-data"
            >
              <input type="file" name="file" />
              <input type="submit" value="Upload" />
            </form>
            {uploadedFile && (
        <div>
          <h3>Uploaded File</h3>
          <img src={`http://localhost:8080/uploads/${uploadedFile}`} alt="Uploaded File" />
        </div>
      )}

          </div>

          <div>
            <label htmlFor="theme">Theme:</label>
            <select id="theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label htmlFor="posts">Number of Posts:</label>
            <input type="number" id="posts" placeholder="Enter number" />
          </div>

          {/* Save and Close Buttons */}
          <div>
            <button onClick={handleClose}>Close</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    )
  );
};

export default PopUp;
