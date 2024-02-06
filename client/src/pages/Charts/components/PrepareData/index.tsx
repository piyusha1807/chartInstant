import { Box, Button, Card } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import { createTheme } from '@mui/material/styles';
// import { makeStyles } from '@mui/styles';
import { HotTable } from '@handsontable/react';
// eslint-disable-next-line no-unused-vars
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import { useSelector } from 'react-redux';
import DatasetDetails from './datasetDetails';
// import _ from 'lodash';

// const defaultTheme = createTheme();

// const useStyles = makeStyles(
//   (theme) => ({
//     actions: {
//       color: theme.palette.text.secondary,
//     },
//     textPrimary: {
//       color: theme.palette.text.primary,
//     },
//   }),
//   { defaultTheme },
// );

const PrepareData = (props: any) => {
  const { data, setData } = props;
  const { uploadedData } = useSelector((state: any) => state.uploadReducer);

  const navigate = useNavigate();
  // const classes = useStyles();

  const [prepareData, setPrepareData] = useState(uploadedData);

  const handleTableChange = (change: any, source: any) => {
    const tempPrepareData = JSON.parse(JSON.stringify(prepareData));
    console.log(change, source);
    if (source === 'edit') {
      console.log(change, source, tempPrepareData[2][2]);
      tempPrepareData[2][2] = change[3];
      setPrepareData(tempPrepareData);
      console.log({ tempPrepareData });
    }
  };

  const handleBack = () => {
    navigate('/chart/new/upload');
  };

  const handleNext = () => {
    setData({
      ...data,
      prepareData,
    });
    navigate('/chart/new/config');
  };

  return (
    <Card sx={{ padding: '1rem', marginTop: '1rem' }}>
      <HotTable
        id="hot"
        data={prepareData || []}
        width="60%"
        height="25rem"
        colHeaders
        rowHeaders
        customBorders
        dropdownMenu
        multiColumnSorting
        filters
        manualColumnResize
        manualRowResize
        afterChange={handleTableChange}
        licenseKey="non-commercial-and-evaluation"
      />
      <DatasetDetails />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button color="primary" variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Card>
  );
};

export default PrepareData;
