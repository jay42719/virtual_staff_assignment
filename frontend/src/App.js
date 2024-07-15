import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, LinearProgress, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:5000/api/file/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setProgress(Math.round((loaded * 100) / total));
        },
      });
      setUploadedFiles([...uploadedFiles, response.data]);
      setFile(null);
      setTitle('');
      setDescription('');
      setProgress(0);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/file/list');
        setUploadedFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    fetchUploadedFiles();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Video and Audio Upload Application
        </Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <input type="file" accept="video/*,audio/*" onChange={handleFileChange} />
            {progress > 0 && (
              <Box mt={2}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
              </Box>
            )}
            <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file}>
              Upload
            </Button>
          </Box>
        </Paper>
        <Box my={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            Uploaded Files
          </Typography>
          <List>
            {uploadedFiles.map((file) => (
              <ListItem key={file._id} divider>
                <ListItemText
                  primary={file.title}
                  secondary={file.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
