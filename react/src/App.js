import React, { useState } from "react";
import axios from "axios";

function App() {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [uploading, setUploading] = useState(false); // Track upload status

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true); // Start upload
            const response = await axios.post("http://51.21.224.181:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFileUrl(response.data.fileUrl);
            alert("Upload successful!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Check the console for more details.");
        } finally {
            setUploading(false); // Stop upload
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>File Upload to AWS S3</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {fileUrl && (
                <div>
                    <h3>Uploaded File:</h3>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        {fileUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

export default App;
