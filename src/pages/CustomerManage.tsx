// src/components/CustomerManagement.tsx

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import Papa from 'papaparse';

interface Customer {
  id: number;
  personInCharge: string;
  phoneNumber: string;
  companyName: string;
  companyAddress: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data as string[][];
          const parsedCustomers: Customer[] = data.slice(1).map((row, index) => ({
            id: index,
            personInCharge: row[0],
            phoneNumber: row[1],
            companyName: row[2],
            companyAddress: row[3],
          }));
          setCustomers(parsedCustomers);
        },
        header: false,
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>

      {/* File Upload */}
      <Button variant="contained" component="label" startIcon={<UploadFile />}>
        Upload CSV
        <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
      </Button>

      {/* Customer Table */}
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
                <TableRow key={customer.id}>
                  <TableCell>{customer.personInCharge}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.companyName}</TableCell>
                  <TableCell>{customer.companyAddress}</TableCell>
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
  );
};

export default CustomerManagement;
