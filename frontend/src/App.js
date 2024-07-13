import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const res = await axios.get('/api/files');
            setUploadedFiles(res.data);
        };
        fetchFiles();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        setUploading(true);
        try {
            const res = await axios.post('/api/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadedFiles([...uploadedFiles, res.data]);
        } catch (err) {
            console.error(err);
        }
        setUploading(false);
    };

    return (
        <div>
            <h1>Upload Video/Audio</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</button>
            </form>
            <h2>Uploaded Files</h2>
            <ul>
                {uploadedFiles.map(file => (
                    <li key={file._id}>
                        <p>{file.title}</p>
                        <p>{file.description}</p>
                        <p><a href={file.fileUrl} target="_blank" rel="noopener noreferrer">View File</a></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
