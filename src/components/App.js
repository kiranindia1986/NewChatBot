import React, { useState } from "react";
import FileUpload from "./FileUpload";
import QuestionHandler from "./QuestionHandler";
import UploadedFiles from "./UploadedFiles";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="App">
      {/* Hero Section */}
      <header className="hero">
        <h1>AskNexus</h1>
        <p>Your AI assistant for insights and answers</p>
      </header>

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "upload" ? "active" : ""}`}
          onClick={() => setActiveTab("upload")}
        >
          <i className="fas fa-upload"></i> Upload File
        </button>
        <button
          className={`tab ${activeTab === "ask" ? "active" : ""}`}
          onClick={() => setActiveTab("ask")}
        >
          <i className="fas fa-question-circle"></i> Ask a Question
        </button>
        <button
          className={`tab ${activeTab === "files" ? "active" : ""}`}
          onClick={() => setActiveTab("files")}
        >
          <i className="fas fa-folder-open"></i> Uploaded Files
        </button>
      </div>

      {/* Main Content */}
      <main>
        {activeTab === "upload" && (
          <div className="card">
            <FileUpload />
          </div>
        )}
        {activeTab === "ask" && (
          <div className="card">
            <QuestionHandler />
          </div>
        )}
        {activeTab === "files" && (
          <div className="card">
            <UploadedFiles />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
