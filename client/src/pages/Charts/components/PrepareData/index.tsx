import { Box, Button, CircularProgress, Snackbar, Stack, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import { useSelector } from 'react-redux';
import DatasetDetails from './datasetDetails';

const PrepareData = ({ data, setData }: any) => {
  const { uploadedData } = useSelector((state: any) => state.uploadReducer);
  const navigate = useNavigate();
  const [prepareData, setPrepareData] = useState(uploadedData);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleTableChange = (change: any, source: any) => {
    if (source === 'edit') {
      const tempPrepareData = JSON.parse(JSON.stringify(prepareData));
      tempPrepareData[change[0][0]][change[0][1]] = change[0][3];
      setPrepareData(tempPrepareData);
    }
  };

  const handleBack = () => {
    navigate('/chart/new/upload');
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setData({
        ...data,
        prepareData,
      });
      setLoading(false);
      navigate('/chart/new/config');
    }, 1000);
  };

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box height="70vh" overflow="auto" width="100%">
            <HotTable
              id="hot"
              data={prepareData || []}
              autoWrapRow
              autoWrapCol
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
              stretchH="all"
              height="100%"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box height="70vh" overflow="auto" width="100%">
            <DatasetDetails data={prepareData} />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
        <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleNext}
          disabled={loading}
          endIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Loading...' : 'Next'}
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="An error occurred. Please try again."
      />
    </Stack>
  );
};

export default PrepareData;
