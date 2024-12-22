import React from "react";
import QuestionHandler from "./QuestionHandler";
import FileUpload from "./FileUpload";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>LangChain File Upload & Question Answering</h1>
      </header>
      <main>
        <FileUpload />
        <QuestionHandler />
      </main>
    </div>
  );
};

export default App;
