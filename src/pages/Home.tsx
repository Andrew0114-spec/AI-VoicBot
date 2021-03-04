import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Paper, Button, Avatar, TableContainer, TableCell, Table, TableHead, TableBody, TableRow } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CallIcon from '@mui/icons-material/Call';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Papa from 'papaparse';

// Define types for the rows of the table (Uploaded Files)
interface Customer {
  id: number;
  personInCharge: string;
  phoneNumber: string;
  companyName: string;
  companyAddress: string;
}
const Home: React.FC = () => {
  const [customers, setCustomers] = useState([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as string[][];
          let tempcustomers = customers;
          data.map((row,index)=>[index, ...row])
          tempcustomers.push(data);
          console.log(data);
          console.log(tempcustomers);
          setCustomers(tempcustomers);
        },
        header: false,
      });
    }
  };


  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Top Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Customer Management Dashboard</Typography>
        <Avatar src="/profile.jpg" alt="User" />
      </Box>

      <Grid container spacing={4}>
        {/* CSV Upload Section */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>CSV Upload Section</Typography>
            <Box sx={{ border: '1px dashed grey', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CloudUploadIcon fontSize="large" color="primary" />
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>Drag & Drop or Click to Upload CSV</Typography>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button variant="contained" component="span" sx={{ mt: 2 }}>Upload CSV</Button>
              </label>
            </Box>

            {/* Recently Uploaded Files Table */}
            <Box sx={{ height: 400, mt: 4 }}>
            {customers.length > 0 ? (
              <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Person In Charge</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Company Address</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer[0]}>
                        <TableCell>{customer[1]}</TableCell>
                        <TableCell>{customer[2]}</TableCell>
                        <TableCell>{customer[3]}</TableCell>
                        <TableCell>{customer[4]}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                            Call
                          </Button>
                          <Button variant="outlined" color="secondary">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" sx={{ mt: 3 }}>
                No customers found. Please upload a CSV file to see customer details.
              </Typography>
            )}
            </Box>
          </Paper>
        </Grid>

        {/* Call Center Overview */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Call Center Overview</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CallIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">Ongoing Calls: 3</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CallIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">Scheduled Calls: 5</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">Next Call: 15:00, 12th Sept</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
