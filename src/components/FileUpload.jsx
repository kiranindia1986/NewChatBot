import React, { useState } from "react";
import { storeTextVector } from "../langchain/embeddings"; // Function to store embeddings
import { extractTextFromPDF } from "../utils/pdfProcessor"; // Utility to extract text from PDFs

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setMessage(""); // Clear previous messages
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file first.");
            return;
        }

        setUploading(true);
        setMessage("");

        try {
            // Extract text content from the PDF
            const extractedText = await extractTextFromPDF(selectedFile);

            // Process each line or paragraph of text as an embedding
            const paragraphs = extractedText.split("\n").filter((line) => line.trim() !== "");
            for (const paragraph of paragraphs) {
                await storeTextVector(paragraph, { fileName: selectedFile.name });
            }

            setMessage("File uploaded and processed successfully!");
        } catch (error) {
            console.error("Error processing file:", error);
            setMessage("Failed to process the file. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="file-upload">
            <h2>Upload a File</h2>
            <input type="file" onChange={handleFileChange} accept=".pdf" />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
