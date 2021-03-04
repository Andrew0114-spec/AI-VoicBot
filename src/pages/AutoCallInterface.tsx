// src/components/AutoCallInterface.tsx

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

// Type definition for call logs
interface CallLog {
  id: number;
  customer: string;
  status: 'In Progress' | 'Completed' | 'Failed';
  timestamp: string;
}

const AutoCallInterface: React.FC = () => {
  const [callStatus, setCallStatus] = useState<'Idle' | 'Calling' | 'In Progress' | 'Completed'>('Idle');
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [callInProgress, setCallInProgress] = useState<string | null>(null);

  // Function to initiate a call
  const handleStartCall = (customer: string) => {
    setCallStatus('Calling');
    setCallInProgress(customer);

    // Simulate call start after a short delay
    setTimeout(() => {
      setCallStatus('In Progress');
    }, 2000);
  };

  // Function to end the current call
  const handleEndCall = () => {
    const timestamp = new Date().toLocaleString();
    setCallLogs((prevLogs) => [
      ...prevLogs,
      {
        id: prevLogs.length + 1,
        customer: callInProgress!,
        status: 'Completed',
        timestamp,
      },
    ]);
    setCallStatus('Completed');
    setCallInProgress(null);
  };

  // Function to simulate a failed call
  const handleFailCall = () => {
    const timestamp = new Date().toLocaleString();
    setCallLogs((prevLogs) => [
      ...prevLogs,
      {
        id: prevLogs.length + 1,
        customer: callInProgress!,
        status: 'Failed',
        timestamp,
      },
    ]);
    setCallStatus('Idle');
    setCallInProgress(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Auto-Call Interface
      </Typography>

      {/* Call Status */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Call Status: {callStatus}</Typography>
        {callInProgress && (
          <Typography variant="body1">
            Calling: <strong>{callInProgress}</strong>
          </Typography>
        )}
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ mb: 3 }}>
        {callStatus === 'Idle' ? (
          <Button variant="contained" color="primary" onClick={() => handleStartCall('John Doe')}>
            Start Call with John Doe
          </Button>
        ) : (
          <>
            <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={handleEndCall}>
              End Call
            </Button>
            <Button variant="contained" color="error" onClick={handleFailCall}>
              Simulate Call Failure
            </Button>
          </>
        )}
      </Box>

      {/* Call Logs */}
      <Typography variant="h6">Call Logs</Typography>
      <Paper sx={{ maxHeight: 300, overflow: 'auto' }}>
        <List>
          {callLogs.length > 0 ? (
            callLogs.map((log) => (
              <div key={log.id}>
                <ListItem>
                  <ListItemText
                    primary={`Call with ${log.customer}`}
                    secondary={`Status: ${log.status} - ${log.timestamp}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))
          ) : (
            <Typography variant="body2" sx={{ p: 2 }}>
              No call logs available.
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default AutoCallInterface;
