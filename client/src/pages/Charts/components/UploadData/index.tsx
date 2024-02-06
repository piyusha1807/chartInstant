/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Box, Card, Stack } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { useSelector } from 'react-redux';
import CopyPaste from './CopyPaste';
import Example from './Example';
import Upload from './Upload';
import '../../styles/UploadData.scss';

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

const UploadData = () => {
  const { uploadOption } = useSelector((state: any) => state.uploadReducer);

  const [uploadOpt, setUploadOpt] = useState(uploadOption || 'upload');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setUploadOpt(newValue);
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
            <Tab
              style={{ minHeight: 0 }}
              icon={<CloudUploadIcon />}
              iconPosition="start"
              label="Upload File"
              value="upload"
            />
            <Tab
              style={{ minHeight: 0 }}
              icon={<CloudUploadIcon />}
              iconPosition="start"
              label="Copy & Paste"
              value="copyPaste"
            />
            <Tab
              style={{ minHeight: 0 }}
              icon={<FilePresentIcon />}
              iconPosition="start"
              label="Example"
              value="example"
            />
          </Tabs>
        </Box>

        <TabPanel value={uploadOpt} selValue="upload">
          <Upload />
        </TabPanel>
        <TabPanel value={uploadOpt} selValue="copyPaste">
          <CopyPaste />
        </TabPanel>
        <TabPanel value={uploadOpt} selValue="example">
          <Example />
        </TabPanel>
      </Stack>
    </Card>
  );
};

export default UploadData;
