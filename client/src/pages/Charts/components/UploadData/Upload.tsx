import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stack,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../../../redux/actions/dashboardActions';

const UploadButton = styled('label')({
  /* Styles for UploadButton */
});

const Input = styled('input')({
  display: 'none',
});

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { upload, uploadedData } = useSelector((state: any) => state.uploadReducer);

  const [selectedFile, setSelectedFile] = useState<any>(upload?.selectedFile ?? {});
  const [isFilePicked, setIsFilePicked] = useState(upload?.isFilePicked ?? false);
  const [sheetNames, setSheetNames] = useState<any>(upload?.sheetNames ?? []);
  // const [sheets, setSheets] = useState<any>(upload?.sheets ?? {});
  const [currSheet, setCurrSheet] = useState<string>(upload?.currSheet ?? '');
  const [data, setData] = useState<any>(uploadedData ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (upload?.error) {
      setError(upload.error);
    }
  }, [upload.error]);

  const handleUpload = () => {
    setUploading(true);
    dispatch(
      uploadFile({
        uploadedData: data,
        uploadOption: 'upload',
        upload: {
          selectedFile,
          isFilePicked,
          sheetNames,
          currSheet,
        },
      })
    );
    navigate('/chart/new/prepare');
    setUploading(false);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsFilePicked(true);
    setError(null);

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setSheetNames(wb.SheetNames);
      // setSheets(wb.Sheets);
      setCurrSheet(wsName);
      setData(data);
    };
    fileReader.onerror = () => {
      setError('Error reading file');
    };
  };

  const handleSheetChange = (value: string) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      const ws = wb.Sheets[value];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(data);
      setCurrSheet(value);
    };
    fileReader.onerror = () => {
      setError('Error reading file');
    };
  };

  return (
    <Stack spacing={2}>
      <Box className="upload-container">
        <Input
          accept=".xlsx, .csv"
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <Stack spacing={1} direction="column" alignItems="center">
          <InsertDriveFileIcon className="upload-icon" color="secondary" />
          <UploadButton htmlFor="contained-button-file" className="upload-button">
            Upload a file
          </UploadButton>
          <Typography variant="body2" color="textSecondary">
            or drag and drop
          </Typography>
          {isFilePicked ? (
            <Typography variant="body2">Filename: {selectedFile.name}</Typography>
          ) : (
            <Typography variant="caption">Supports: Excel (.xlsx), CSV (.csv)</Typography>
          )}
        </Stack>
        {isFilePicked && sheetNames.length > 1 && (
          <Box mt={3}>
            <TextField
              select
              fullWidth
              size="small"
              label="Select sheet"
              value={currSheet}
              onChange={(e) => handleSheetChange(e.target.value)}
            >
              {sheetNames.map((key: any) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpload}
          disabled={uploading || !isFilePicked}
        >
          {uploading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </Box>
    </Stack>
  );
};

export default Upload;
