import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { copyPasteData } from '../../../../redux/actions/dashboardActions';

const CopyPaste = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { copyPaste } = useSelector((state: any) => state.uploadReducer);

  const [data, setData] = useState<any>(copyPaste?.data ?? []);

  const handleTextChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setData(e.target.value);
  };

  const convertTabSepratorToJson = (inputValue: string) => {
    const lines = inputValue.split('\n');
    return lines.map((line: string) => line.split('\t'));
  };

  const handleNext = () => {
    dispatch(
      copyPasteData({
        uploadedData: convertTabSepratorToJson(data),
        uploadOption: 'copyPaste',
        copyPaste: {
          data,
        },
      })
    );
    navigate('/chart/new/prepare');
  };

  return (
    <Stack spacing={1}>
      <div>
        <Typography variant="body1">
          Paste your data from Excel, Word, or any other source into the text area below.
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={10}
          variant="filled"
          value={data}
          onChange={handleTextChange}
          placeholder="Paste your copied data here..."
        />
        <p>Supported formats: tab-separated, and plain text.</p>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
        <Button color="primary" variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Stack>
  );
};

export default CopyPaste;
