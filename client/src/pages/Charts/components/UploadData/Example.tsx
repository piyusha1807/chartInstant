import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box, Button, Stack } from '@mui/material';
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
  const { example } = useSelector((state: any) => state.uploadReducer);

  const [currSampleSheet, setCurrSampleSheet] = useState<string>(example?.currSampleSheet ?? '');
  const [data, setData] = useState<any>([]);

  const handleSampleSheet = async (value: string) => {
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

  return (
    <Stack spacing={1}>
      <div>
        <Typography variant="body2">
          If you just want to try ChartInstant, here are some list of datasets:
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={currSampleSheet}
          onChange={(e) => handleSampleSheet(e.target.value)}
        >
          {sampleSheet.map((sheet: any) => (
            <FormControlLabel value={sheet.value} control={<Radio />} label={sheet.name} />
          ))}
        </RadioGroup>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
        <Button color="primary" variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Stack>
  );
};

export default Example;
