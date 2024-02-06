/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Grid, Box, Typography, Button, TextField, MenuItem, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../../../redux/actions/dashboardActions';

const Input = styled('input')({
  display: 'none',
});

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { upload } = useSelector((state: any) => state.uploadReducer);

  const [selectedFile, setSelectedFile] = useState<any>(upload?.selectedFile ?? {});
  const [isFilePicked, setIsFilePicked] = useState(upload?.isFilePicked ?? false);
  const [sheetNames, setSheetNames] = useState<any>(upload?.sheetNames ?? []);
  const [sheets, setSheets] = useState<any>(upload?.sheets ?? {});
  const [currSheet, setCurrSheet] = useState<string>(upload?.currSheet ?? '');
  const [data, setData] = useState<any>([]);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(event.target.files[0]);

      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        setSheetNames(wb.SheetNames);
        setSheets(wb.Sheets);
        setCurrSheet(wsName);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d: any) => {
      console.log({ d });
      setData(d);
    });
  };

  const handleSheetChange = (value: string) => {
    const ws = sheets[value];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

    setData(data);
    setCurrSheet(value);
  };

  const handleNext = () => {
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
  };

  return (
    <Stack spacing={1}>
      <Grid container>
        <Grid item sm={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ margin: '1rem' }}>
              <Typography variant="body1">Upload CSV or Excel spreadsheets</Typography>
              <br />
              <label htmlFor="contained-button-file">
                <Input
                  accept="file/*"
                  id="contained-button-file"
                  type="file"
                  onChange={changeHandler}
                />
                <Button variant="outlined" startIcon={<FileUploadIcon />} component="span">
                  Upload
                </Button>
              </label>

              {isFilePicked ? (
                <Typography variant="body2">Filename: {selectedFile.name}</Typography>
              ) : (
                <Typography variant="body2">Select a file to show details</Typography>
              )}
            </Box>
            {isFilePicked && sheetNames.length > 1 && (
              <Box sx={{ margin: '1rem' }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Select sheet"
                  value={currSheet}
                  onChange={(e) => {
                    handleSheetChange(e.target.value);
                  }}
                >
                  {sheetNames.map((key: any) => (
                    <MenuItem value={key}>{key}</MenuItem>
                  ))}
                </TextField>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
        <Button color="primary" variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Stack>
  );
};

export default Upload;
