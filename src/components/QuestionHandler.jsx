import React, { useState } from "react";
import { respondToQuestion } from "../langchain/responseHandler";
import "./QuestionHandler.css";

const QuestionHandler = () => {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleAskQuestion = async () => {
        if (!question.trim()) {
            alert("Please enter a question.");
            return;
        }

        setLoading(true);
        setResponse(""); // Clear previous response
        try {
            const answer = await respondToQuestion(question);
            setResponse(answer);
        } catch (error) {
            console.error("Error responding to question:", error);
            setResponse("An error occurred while processing your question.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="question-handler">
            <h2>Ask a Question</h2>
            <textarea
                value={question}
                onChange={handleInputChange}
                placeholder="Type your question here..."
                rows="4"
                cols="50"
            />
            <div className="actions">
                <button onClick={handleAskQuestion} disabled={loading}>
                    {loading ? "Processing..." : "Ask"}
                </button>
            </div>
            {response && (
                <div className="response">
                    <h3>Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionHandler;
