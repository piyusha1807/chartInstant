/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, MenuItem, Stack, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import GridOnIcon from '@mui/icons-material/GridOn';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import TextField from '@mui/material/TextField';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as XLSX from 'xlsx';
import '../../styles/UploadData.scss';
import { useNavigate } from 'react-router';

const Input = styled('input')({
  display: 'none',
});

const sampleSheet = [
  { name: 'example1', value: 'example1.csv' },
  { name: 'example2', value: 'example2.csv' },
  { name: 'example3', value: 'example3.csv' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  selValue: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, selValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== selValue}
      id={`tabpanel-${selValue}`}
      aria-labelledby={`tab-${selValue}`}
      {...other}
    >
      {value === selValue && children}
    </div>
  );
}

const UploadData = (props: any) => {
  const { data, setData } = props;
  const { upload } = data;
  const navigate = useNavigate();

  const [uploadOpt, setUploadOpt] = useState(upload?.uploadOpt || 'upload');
  const [selectedFile, setSelectedFile] = useState<any>(upload?.selectedFile || {});
  const [isFilePicked, setIsFilePicked] = useState(upload?.isFilePicked || false);
  const [csvData, setCsvData] = useState<any>(upload?.csvData || '');
  const [sheetNames, setSheetNames] = useState<any>([]);
  const [sheets, setSheets] = useState<any>({});
  const [currSheet, setCurrSheet] = useState<string>('');
  const [currSampleSheet, setCurrSampleSheet] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setUploadOpt(newValue);
  };

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
        const data = XLSX.utils.sheet_to_csv(ws);

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
      setCsvData(d);
    });
  };

  const handleSheetChange = (value: string) => {
    const ws = sheets[value];
    const data = XLSX.utils.sheet_to_csv(ws);

    setCsvData(data);
    setCurrSheet(value);
  };

  const handleSampleSheet = async (value: string) => {
    const response: any = await fetch(`/data/${value}.csv`);
    const reader = response?.body?.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    setCsvData(csv);
    setCurrSampleSheet(value);
  };

  const handleTextChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setCsvData(e.target.value);
  };

  const handleNext = () => {
    setData({
      upload: {
        uploadOpt,
        selectedFile,
        isFilePicked,
        csvData: csvData.replace(/\n*$/, ''),
      },
    });
    navigate('/chart/new/prepare');
  };

  return (
    <Card sx={{ padding: '1rem', marginTop: '1rem' }}>
      <Stack spacing={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={uploadOpt}
            onChange={handleChange}
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Upload options"
          >
            <Tab icon={<CloudUploadIcon />} label="Upload File" value="upload" />
            <Tab icon={<CloudUploadIcon />} label="Copy & Paste" value="copyPaste" />
            <Tab icon={<FilePresentIcon />} label="Example" value="example" />
          </Tabs>
        </Box>

        <TabPanel value={uploadOpt} selValue="upload">
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
                <Box sx={{ margin: '1rem' }}>
                  <Typography variant="body2">
                    If you just want to try ChartInstant, here are some list of datasets:
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Select a sample dataset"
                    value={currSampleSheet}
                    onChange={(e) => {
                      handleSampleSheet(e.target.value);
                    }}
                  >
                    {sampleSheet.map((item: any, idx: number) => (
                      <MenuItem key={idx} value={item.name}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={12} md={8}>
              <TextField
                fullWidth
                multiline
                rows={10}
                variant="filled"
                value={csvData}
                onChange={handleTextChange}
                placeholder="Or paste you copied data here..."
              />
            </Grid>
          </Grid>
        </TabPanel>

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button color="primary" variant="contained" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default UploadData;
