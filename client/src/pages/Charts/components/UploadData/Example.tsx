import React, { useState } from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Button,
  CircularProgress,
  Stack,
  Snackbar,
} from '@mui/material';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { exampleFile } from '../../../../redux/actions/dashboardActions';

const sampleSheet = [
  { name: 'Example 1', value: 'example1.xlsx' },
  { name: 'Example 2', value: 'example2.xlsx' },
  { name: 'Example 3', value: 'example3.xlsx' },
];

const Example = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { example, uploadedData } = useSelector((state: any) => state.uploadReducer);

  const [currSampleSheet, setCurrSampleSheet] = useState<string>(example?.currSampleSheet ?? '');
  const [data, setData] = useState<any>(uploadedData ?? []);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSampleSheet = async (value: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/data/${value}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch XLSX: ${response.status} ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(jsonData);
      setCurrSampleSheet(value);
    } catch (error) {
      console.error('Error fetching or parsing XLSX:', error);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    dispatch(
      exampleFile({
        uploadedData: data,
        uploadOption: 'example',
        example: {
          currSampleSheet,
        },
      })
    );
    navigate('/chart/new/prepare');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="body2">Select an example dataset to get started quickly:</Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={currSampleSheet}
        onChange={(e) => handleSampleSheet(e.target.value)}
      >
        {sampleSheet.map((sheet: any) => (
          <FormControlLabel
            key={sheet.value}
            value={sheet.value}
            control={<Radio />}
            label={
              <Box>
                <Typography>{sheet.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Rows: <span style={{ fontFamily: 'monospace' }}>{2}</span>, Columns:{' '}
                  <span style={{ fontFamily: 'monospace' }}>{3}</span>
                </Typography>
              </Box>
            }
          />
        ))}
      </RadioGroup>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleNext}
          disabled={!currSampleSheet || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Next'}
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Failed to load example dataset. Please try again later."
      />
    </Stack>
  );
};

export default Example;
