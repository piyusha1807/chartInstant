import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { copyPasteData } from '../../../../redux/actions/dashboardActions';

const CopyPaste = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { copyPaste } = useSelector((state: any) => state.uploadReducer);

  const [data, setData] = useState<string>(copyPaste?.data ?? '');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = textarea;
      const newValue = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);
      setData(newValue);
    }
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
    <Stack spacing={2}>
      <Typography variant="body2">Paste your data from Excel, Word, or any other source into the text area below:</Typography>
      <TextField
        fullWidth
        multiline
        rows={8}
        variant="outlined"
        value={data}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown} // Handle tab key
        placeholder="Paste your copied data here..."
      />
      <Typography variant="body2" color="textSecondary">Supported formats: Tab-separated and plain text.</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleNext}
          disabled={!data.trim()}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
};

export default CopyPaste;
