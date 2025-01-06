import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./UploadedFiles.css";

const UploadedFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [fileToDelete, setFileToDelete] = useState(null); // For confirmation modal

    const db = getFirestore(); // Initialize Firestore

    // Fetch files from Firebase
    const fetchFiles = async () => {
        try {
            const vectorCollection = collection(db, "vectors");
            const querySnapshot = await getDocs(vectorCollection);
            const fileData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                fileName: doc.data().metadata?.fileName || "Unknown File",
            }));
            setFiles(fileData);
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoading(false);
        }
    };

    // Delete a file from Firebase
    const handleDelete = async () => {
        if (fileToDelete) {
            try {
                await deleteDoc(doc(db, "vectors", fileToDelete.id));
                setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileToDelete.id));
            } catch (error) {
                console.error("Error deleting file:", error);
            } finally {
                setFileToDelete(null); // Close modal
            }
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentFiles = files.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(files.length / recordsPerPage);

    return (
        <div className="uploaded-files">
            <h2>Uploaded Files</h2>
            {loading ? (
                <p>Loading...</p>
            ) : files.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFiles.map((file) => (
                                <tr key={file.id}>
                                    <td>{file.fileName}</td>
                                    <td>
                                        <button onClick={() => setFileToDelete(file)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No files uploaded yet.</p>
            )}

            {/* Confirmation Modal */}
            {fileToDelete && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete "{fileToDelete.fileName}"?</p>
                        <div className="modal-actions">
                            <button onClick={handleDelete}>Yes</button>
                            <button onClick={() => setFileToDelete(null)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadedFiles;
