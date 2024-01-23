import React, { useState } from 'react';
import './App.css';
import axios from 'axios' 

const FileUpload = () => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] =  useState("")

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setSelectedFile(e.target.files[0]);
  };

  const handleRunClick = async () => {
    // Add your logic to run the desired functionality with the selected file
    // For now, let's just log a message
    const url = "http://127.0.0.1:8000/upload_run"
    const formdata = new FormData();
    formdata.append('file', selectedFile)
    const config = {
      headers:{"Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data"}
    }
    await axios.post(url, formdata, config)
    .then((resp)=>
    {
      console.log(resp)
    }
    )
    .catch((e)=>{
      console.log(e)
    })
    console.log('Running with file:', selectedFile);
    setSelectedFile(null)
    setText("File uploaded and running..")
  };

  return (
    <div className="file-upload-container">
      <label htmlFor="fileInput" className="file-label">
        Select Data File:
      </label>
      <input
        type="file"
        id="fileInput"
        className="file-input"
        onChange={handleFileChange}
        accept=".csv, .txt"
      />

      <div className="selected-file">
        {selectedFile && (
          <div>
            <strong>Selected File:</strong> {selectedFile.name}
          </div>
        )}
      </div>
      <div>
        <strong>{text}</strong>
      </div>
      <button className="run-button" onClick={handleRunClick}>
        Run
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <h1>Bulk Download</h1>
      <FileUpload />
    </div>
  );
};

export default App;
