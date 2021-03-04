// src/components/VoiceAnalysisSection.tsx

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, LinearProgress, TextField, List, ListItem, Divider } from '@mui/material';

// Type definition for analysis results
interface AnalysisResult {
  id: number;
  fileName: string;
  transcript: string;
  sentiment: string;
}

const VoiceAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [currentSentiment, setCurrentSentiment] = useState<string>('');

  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Simulate the voice analysis process
  const handleAnalyzeVoice = () => {
    if (file) {
      setUploading(true);
      setTimeout(() => {
        // Mock voice analysis result
        const transcript = "This is a mock transcription of the audio file.";
        const sentiment = "Positive"; // Mock sentiment analysis result

        // Save result
        const newResult: AnalysisResult = {
          id: analysisResults.length + 1,
          fileName: file.name,
          transcript,
          sentiment,
        };

        setAnalysisResults([...analysisResults, newResult]);
        setCurrentTranscript(transcript);
        setCurrentSentiment(sentiment);
        setUploading(false);
      }, 3000); // Simulate 3 seconds of processing time
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Voice Analysis Section
      </Typography>

      {/* File Upload */}
      <Box sx={{ mb: 3 }}>
        <Button variant="contained" component="label">
          Upload Audio File
          <input type="file" accept="audio/*" hidden onChange={handleFileChange} />
        </Button>
        {file && <Typography sx={{ mt: 1 }}>Selected File: {file.name}</Typography>}
      </Box>

      {/* Analyze Button */}
      <Button
        variant="contained"
        color="primary"
        disabled={!file || uploading}
        onClick={handleAnalyzeVoice}
      >
        Analyze Voice
      </Button>

      {/* Progress Bar */}
      {uploading && (
        <Box sx={{ width: '100%', mt: 3 }}>
          <LinearProgress />
          <Typography sx={{ mt: 1 }}>Analyzing voice file...</Typography>
        </Box>
      )}

      {/* Display Current Analysis */}
      {currentTranscript && !uploading && (
        <Paper sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6">Analysis Result</Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Transcript:</strong> {currentTranscript}
          </Typography>
          <Typography variant="body1">
            <strong>Sentiment:</strong> {currentSentiment}
          </Typography>
        </Paper>
      )}

      {/* Analysis History */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Analysis History
      </Typography>
      <Paper sx={{ maxHeight: 300, overflow: 'auto' }}>
        <List>
          {analysisResults.length > 0 ? (
            analysisResults.map((result) => (
              <div key={result.id}>
                <ListItem>
                  <Typography variant="body2">
                    <strong>File:</strong> {result.fileName}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    <strong>Transcript:</strong> {result.transcript}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Sentiment:</strong> {result.sentiment}
                  </Typography>
                </ListItem>
                <Divider />
              </div>
            ))
          ) : (
            <Typography variant="body2" sx={{ p: 2 }}>
              No analysis results available.
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default VoiceAnalysis;
