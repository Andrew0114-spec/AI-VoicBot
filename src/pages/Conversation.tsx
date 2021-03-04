// src/components/ConversationScriptManagement.tsx

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadFile } from '@mui/icons-material';
import Papa from 'papaparse';

interface Script {
  id: number;
  name: string;
  content: string;
}

const Conversation: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [newScriptName, setNewScriptName] = useState<string>('');

  // Function to handle file upload (for script files)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as string[][];
          const newScripts: Script[] = data.map((row, index) => ({
            id: index,
            name: row[0],
            content: row[1],
          }));
          setScripts((prevScripts) => [...prevScripts, ...newScripts]);
        },
        header: false,
      });
    }
  };

  // Function to handle script selection
  const handleSelectScript = (script: Script) => {
    setSelectedScript(script);
  };

  // Function to update the content of the selected script
  const handleScriptChange = (content: string) => {
    if (selectedScript) {
      setSelectedScript({ ...selectedScript, content });
    }
  };

  // Function to save the edited script
  const handleSaveScript = () => {
    if (selectedScript) {
      setScripts((prevScripts) =>
        prevScripts.map((script) =>
          script.id === selectedScript.id ? selectedScript : script
        )
      );
    }
  };

  // Function to add a new script
  const handleAddScript = () => {
    const newScript: Script = {
      id: scripts.length + 1,
      name: newScriptName,
      content: '',
    };
    setScripts([...scripts, newScript]);
    setNewScriptName('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Conversation Script Management
      </Typography>

      {/* File Upload */}
      <Button variant="contained" component="label" startIcon={<UploadFile />}>
        Upload Script CSV
        <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
      </Button>

      {/* Add New Script */}
      <Box sx={{ mt: 3 }}>
        <TextField
          label="New Script Name"
          variant="outlined"
          value={newScriptName}
          onChange={(e) => setNewScriptName(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleAddScript}>
          Add New Script
        </Button>
      </Box>

      {/* Script List */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Scripts:
      </Typography>
      {scripts.length > 0 ? (
        <Box sx={{ mt: 2 }}>
          {scripts.map((script) => (
            <Paper
              key={script.id}
              sx={{
                p: 2,
                mb: 2,
                cursor: 'pointer',
                backgroundColor:
                  selectedScript?.id === script.id ? '#f0f0f0' : '#fff',
              }}
              onClick={() => handleSelectScript(script)}
            >
              <Typography variant="body1">{script.name}</Typography>
            </Paper>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No scripts found. Add or upload a script to manage.
        </Typography>
      )}

      {/* Script Editor */}
      {selectedScript && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Editing Script: {selectedScript.name}</Typography>
          <ReactQuill
            theme="snow"
            value={selectedScript.content}
            onChange={handleScriptChange}
            style={{ height: '300px', marginBottom: '20px' }}
          />
          <Button variant="contained" onClick={handleSaveScript}>
            Save Script
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Conversation;
